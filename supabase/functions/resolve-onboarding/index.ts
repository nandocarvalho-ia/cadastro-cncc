import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function normalizeBrazilianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 13 && digits.startsWith("55")) return digits;
  if (digits.length === 11) return "55" + digits;
  if (digits.length === 10) return "55" + digits;
  if (digits.length === 12 && digits.startsWith("55")) return digits; // edge: missing 9
  return "55" + digits; // best-effort
}

function lastEight(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.slice(-8);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ref, email, telefone, rota_evento } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ──────────────────────────────────────────────
    // FLUXO EVENTO (link manual do time)
    // ──────────────────────────────────────────────
    if (rota_evento && !ref) {
      if (!telefone) {
        return new Response(
          JSON.stringify({ error: "Telefone é obrigatório no fluxo evento" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const normalizedPhone = normalizeBrazilianPhone(telefone);
      const last8 = lastEight(normalizedPhone);
      const emailLower = email.toLowerCase().trim();

      // Buscar leads por email OU ultimos_8
      const { data: byEmail } = await supabase
        .from("leads")
        .select("id, email, telefone, ultimos_8")
        .eq("email", emailLower);

      const { data: byPhone } = await supabase
        .from("leads")
        .select("id, email, telefone, ultimos_8")
        .eq("ultimos_8", last8);

      // Merge unique leads
      const mergedMap = new Map<string, typeof byEmail extends (infer T)[] | null ? T : never>();
      for (const l of byEmail || []) mergedMap.set(l.id, l);
      for (const l of byPhone || []) mergedMap.set(l.id, l);
      const candidates = Array.from(mergedMap.values());

      if (candidates.length === 1) {
        const lead = candidates[0];
        // Update missing field
        const updates: Record<string, string> = {};
        if (!lead.email) updates.email = emailLower;
        if (!lead.telefone || lead.telefone === "") updates.telefone = normalizedPhone;
        if (Object.keys(updates).length > 0) {
          await supabase.from("leads").update(updates).eq("id", lead.id);
        }

        return new Response(
          JSON.stringify({
            status: "resolved",
            lead_id: lead.id,
            confianca: "media",
            origem_vinculo: "evento_identificacao",
            needs_phone: false,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (candidates.length > 1) {
        // Try to narrow: lead that matches BOTH email AND ultimos_8
        const exact = candidates.filter(
          (l) => l.email === emailLower && l.ultimos_8 === last8
        );
        if (exact.length === 1) {
          return new Response(
            JSON.stringify({
              status: "resolved",
              lead_id: exact[0].id,
              confianca: "media",
              origem_vinculo: "evento_identificacao",
              needs_phone: false,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Still ambiguous — create new lead to avoid wrong merge
      }

      // No match or unresolvable ambiguity — create new lead
      const { data: newLead, error: insertErr } = await supabase
        .from("leads")
        .insert({
          email: emailLower,
          telefone: normalizedPhone,
          origem_principal: "formulario_manual",
        })
        .select("id")
        .single();

      if (insertErr) {
        return new Response(
          JSON.stringify({ error: "Erro ao criar lead", details: insertErr.message }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          status: "resolved",
          lead_id: newLead.id,
          confianca: "media",
          origem_vinculo: "evento_novo_lead",
          needs_phone: false,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ──────────────────────────────────────────────
    // FLUXO TOKEN (WhatsApp) — sem alteração
    // ──────────────────────────────────────────────
    if (ref) {
      const { data: tokenRow } = await supabase
        .from("onboarding_tokens")
        .select("lead_id, expira_em, usado_em")
        .eq("token", ref)
        .maybeSingle();

      if (tokenRow) {
        const { count } = await supabase
          .from("compras")
          .select("id", { count: "exact", head: true })
          .eq("lead_id", tokenRow.lead_id);

        if (count && count > 0) {
          const isExpired = tokenRow.expira_em && new Date(tokenRow.expira_em) < new Date();
          return new Response(
            JSON.stringify({
              status: "resolved",
              lead_id: tokenRow.lead_id,
              confianca: isExpired ? "media" : "alta",
              origem_vinculo: "token",
              needs_phone: false,
            }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
    }

    // ──────────────────────────────────────────────
    // FALLBACK POR EMAIL (fluxo original)
    // ──────────────────────────────────────────────
    const { data: leads } = await supabase
      .from("leads")
      .select("id, telefone")
      .eq("email", email.toLowerCase().trim());

    if (!leads || leads.length === 0) {
      return new Response(
        JSON.stringify({
          status: "not_found",
          lead_id: null,
          confianca: null,
          origem_vinculo: null,
          needs_phone: false,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const leadsWithPurchase: typeof leads = [];
    for (const lead of leads) {
      const { count } = await supabase
        .from("compras")
        .select("id", { count: "exact", head: true })
        .eq("lead_id", lead.id);
      if (count && count > 0) {
        leadsWithPurchase.push(lead);
      }
    }

    if (leadsWithPurchase.length === 0) {
      return new Response(
        JSON.stringify({
          status: "not_found",
          lead_id: null,
          confianca: null,
          origem_vinculo: null,
          needs_phone: false,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (leadsWithPurchase.length === 1) {
      return new Response(
        JSON.stringify({
          status: "resolved",
          lead_id: leadsWithPurchase[0].id,
          confianca: "media",
          origem_vinculo: "email_fallback",
          needs_phone: false,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Ambíguo — tentar desempate por telefone
    if (telefone) {
      const normalizedPhone = telefone.replace(/\D/g, "");
      const matched = leadsWithPurchase.filter((l) => {
        const leadPhone = (l.telefone || "").replace(/\D/g, "");
        return leadPhone === normalizedPhone || leadPhone.endsWith(normalizedPhone) || normalizedPhone.endsWith(leadPhone);
      });

      if (matched.length === 1) {
        return new Response(
          JSON.stringify({
            status: "resolved",
            lead_id: matched[0].id,
            confianca: "media",
            origem_vinculo: "email_telefone_fallback",
            needs_phone: false,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({
          status: "unresolved",
          lead_id: null,
          confianca: null,
          origem_vinculo: null,
          needs_phone: false,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        status: "ambiguous",
        lead_id: null,
        confianca: null,
        origem_vinculo: null,
        needs_phone: true,
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
