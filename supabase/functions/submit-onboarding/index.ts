import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const VERSAO_FORMULARIO = "cncc-v2";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ref, email, telefone, respostas } = await req.json();

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

    // Re-resolver lead_id no backend (não confiar no front)
    let resolvedLeadId: string | null = null;
    let origemVinculo: string | null = null;
    let confianca: string | null = null;

    // 1. Tentar por token
    if (ref) {
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

          // Marcar token como usado
          await supabase
            .from("onboarding_tokens")
            .update({ usado_em: new Date().toISOString() })
            .eq("id", tokenRow.id);
        }
      }
    }

    // 2. Fallback por email
    if (!resolvedLeadId) {
      const { data: leads } = await supabase
        .from("leads")
        .select("id, telefone")
        .eq("email", email.toLowerCase().trim());

      if (leads && leads.length > 0) {
        // Filtrar com compra
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

    // 3. Gravar ou salvar rascunho
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

      return new Response(
        JSON.stringify({ status: "saved", lead_id: resolvedLeadId, origem_vinculo: origemVinculo, confianca }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sem vínculo confiável — salvar rascunho
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
