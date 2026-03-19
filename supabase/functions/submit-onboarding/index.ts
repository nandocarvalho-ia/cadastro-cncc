import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VERSAO_FORMULARIO = "cncc-v2";
const WEBHOOK_URL = "https://n8n-n8n.frxa1g.easypanel.host/webhook/qualifica-lead-onboarding";

function normalizeBrazilianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("55")) return digits;
  if (digits.length === 11) return "55" + digits;
  if (digits.length === 10) return "55" + digits;
  if (digits.length === 12 && digits.startsWith("55")) return digits;
  return "55" + digits;
}

function lastEight(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.slice(-8);
}

async function notifyWebhook(payload: {
  telefone: string | null;
  email: string;
  lead_id: string | null;
  status: string;
  origem_vinculo: string | null;
  confianca: string | null;
}) {
  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (e) {
    console.error("Webhook notify failed:", e);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ref, email, telefone, respostas, rota_evento } = await req.json();

    if (!email || !respostas) {
      return new Response(
        JSON.stringify({ error: "Email e respostas são obrigatórios" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let resolvedLeadId: string | null = null;
    let origemVinculo: string | null = null;
    let confianca: string | null = null;

    // ──────────────────────────────────────────────
    // FLUXO EVENTO — re-resolver pelo backend
    // ──────────────────────────────────────────────
    if (rota_evento && !ref && telefone) {
      const normalizedPhone = normalizeBrazilianPhone(telefone);
      const last8 = lastEight(normalizedPhone);
      const emailLower = email.toLowerCase().trim();

      const { data: byEmail } = await supabase
        .from("leads")
        .select("id, email, telefone, ultimos_8")
        .eq("email", emailLower);

      const { data: byPhone } = await supabase
        .from("leads")
        .select("id, email, telefone, ultimos_8")
        .eq("ultimos_8", last8);

      const mergedMap = new Map<string, any>();
      for (const l of byEmail || []) mergedMap.set(l.id, l);
      for (const l of byPhone || []) mergedMap.set(l.id, l);
      const candidates = Array.from(mergedMap.values());

      if (candidates.length === 1) {
        resolvedLeadId = candidates[0].id;
        origemVinculo = "evento_identificacao";
        confianca = "media";
      } else if (candidates.length > 1) {
        const exact = candidates.filter(
          (l: any) => l.email === emailLower && l.ultimos_8 === last8
        );
        if (exact.length === 1) {
          resolvedLeadId = exact[0].id;
          origemVinculo = "evento_identificacao";
          confianca = "media";
        }
      }

      // If still not found, create new lead
      if (!resolvedLeadId) {
        const { data: newLead, error: insertErr } = await supabase
          .from("leads")
          .insert({
            email: emailLower,
            telefone: normalizedPhone,
            origem_principal: "formulario_manual",
          })
          .select("id")
          .single();

        if (!insertErr && newLead) {
          resolvedLeadId = newLead.id;
          origemVinculo = "evento_novo_lead";
          confianca = "media";
        }
      }
    }

    // ──────────────────────────────────────────────
    // FLUXO TOKEN — sem alteração
    // ──────────────────────────────────────────────
    if (!resolvedLeadId && ref) {
      const { data: tokenRow } = await supabase
        .from("onboarding_tokens")
        .select("id, lead_id, expira_em")
        .eq("token", ref)
        .maybeSingle();

      if (tokenRow) {
        const { count } = await supabase
          .from("compras")
          .select("id", { count: "exact", head: true })
          .eq("lead_id", tokenRow.lead_id);

        if (count && count > 0) {
          resolvedLeadId = tokenRow.lead_id;
          origemVinculo = "token";
          const isExpired = tokenRow.expira_em && new Date(tokenRow.expira_em) < new Date();
          confianca = isExpired ? "media" : "alta";

          await supabase
            .from("onboarding_tokens")
            .update({ usado_em: new Date().toISOString() })
            .eq("id", tokenRow.id);
        }
      }
    }

    // ──────────────────────────────────────────────
    // FALLBACK POR EMAIL (fluxo original)
    // ──────────────────────────────────────────────
    if (!resolvedLeadId && !rota_evento) {
      const { data: leads } = await supabase
        .from("leads")
        .select("id, telefone")
        .eq("email", email.toLowerCase().trim());

      if (leads && leads.length > 0) {
        const leadsWithPurchase: typeof leads = [];
        for (const lead of leads) {
          const { count } = await supabase
            .from("compras")
            .select("id", { count: "exact", head: true })
            .eq("lead_id", lead.id);
          if (count && count > 0) leadsWithPurchase.push(lead);
        }

        if (leadsWithPurchase.length === 1) {
          resolvedLeadId = leadsWithPurchase[0].id;
          origemVinculo = "email_fallback";
          confianca = "media";
        } else if (leadsWithPurchase.length > 1 && telefone) {
          const normalizedPhone = telefone.replace(/\D/g, "");
          const matched = leadsWithPurchase.filter((l) => {
            const lp = (l.telefone || "").replace(/\D/g, "");
            return lp === normalizedPhone || lp.endsWith(normalizedPhone) || normalizedPhone.endsWith(lp);
          });
          if (matched.length === 1) {
            resolvedLeadId = matched[0].id;
            origemVinculo = "email_telefone_fallback";
            confianca = "media";
          }
        }
      }
    }

    // ──────────────────────────────────────────────
    // GRAVAR RESPOSTAS OU RASCUNHO
    // ──────────────────────────────────────────────
    if (resolvedLeadId && confianca) {
      const rows = Object.entries(respostas).map(([chave, valor]) => ({
        lead_id: resolvedLeadId,
        chave_pergunta: chave,
        resposta_texto: String(valor),
        versao_formulario: VERSAO_FORMULARIO,
      }));

      const { error: insertError } = await supabase
        .from("respostas_onboarding")
        .insert(rows);

      if (insertError) {
        return new Response(
          JSON.stringify({ error: "Erro ao salvar respostas", details: insertError.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      notifyWebhook({ telefone: telefone || null, email, lead_id: resolvedLeadId, status: "saved", origem_vinculo: origemVinculo, confianca });

      return new Response(
        JSON.stringify({ status: "saved", lead_id: resolvedLeadId, origem_vinculo: origemVinculo, confianca }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sem vínculo — salvar rascunho
    const { error: draftError } = await supabase
      .from("onboarding_rascunhos")
      .insert({
        email,
        telefone: telefone || null,
        ref_tentado: ref || null,
        respostas,
        status: "pendente",
      });

    if (draftError) {
      return new Response(
        JSON.stringify({ error: "Erro ao salvar rascunho", details: draftError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    notifyWebhook({ telefone: telefone || null, email, lead_id: null, status: "draft_saved", origem_vinculo: null, confianca: null });

    return new Response(
      JSON.stringify({
        status: "draft_saved",
        message: "Suas respostas foram recebidas e estão em análise de vinculação.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erro interno", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
