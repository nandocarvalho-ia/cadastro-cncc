import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { ref, email, telefone } = await req.json();

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

    // 1. Tentar resolver por token
    if (ref) {
      const { data: tokenRow } = await supabase
        .from("onboarding_tokens")
        .select("lead_id, expira_em, usado_em")
        .eq("token", ref)
        .maybeSingle();

      if (tokenRow) {
        // Verificar se lead tem compra
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
      // Token inválido ou lead sem compra — fallback por email
    }

    // 2. Fallback por email
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

    // Filtrar apenas leads com compra
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

    // 3. Ambíguo — tentar desempate por telefone
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
