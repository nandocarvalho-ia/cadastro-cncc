import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export interface ResolutionState {
  status: "idle" | "resolving" | "resolved" | "not_found" | "ambiguous" | "unresolved";
  leadId: string | null;
  confianca: "alta" | "media" | null;
  origemVinculo: string | null;
  needsPhone: boolean;
  refToken: string | null;
  eventoParam: string | null;
  isEventoFlow: boolean;
  error: string | null;
}

export function useOnboardingResolution() {
  const [searchParams] = useSearchParams();
  const refToken = searchParams.get("ref");
  const eventoParam = searchParams.get("evento");
  const isEventoFlow = !!eventoParam && !refToken;

  const [state, setState] = useState<ResolutionState>({
    status: "idle",
    leadId: null,
    confianca: null,
    origemVinculo: null,
    needsPhone: false,
    refToken,
    eventoParam,
    isEventoFlow,
    error: null,
  });

  const resolveByEmail = useCallback(
    async (email: string) => {
      setState((s) => ({ ...s, status: "resolving", error: null }));
      try {
        const { data, error } = await supabase.functions.invoke("resolve-onboarding", {
          body: { ref: refToken, email },
        });
        if (error) throw error;
        setState((s) => ({
          ...s,
          status: data.status,
          leadId: data.lead_id,
          confianca: data.confianca,
          origemVinculo: data.origem_vinculo,
          needsPhone: data.needs_phone ?? false,
        }));
        return data;
      } catch (err) {
        setState((s) => ({ ...s, status: "idle", error: String(err) }));
        return null;
      }
    },
    [refToken]
  );

  const resolveByPhone = useCallback(
    async (email: string, telefone: string) => {
      setState((s) => ({ ...s, status: "resolving", error: null }));
      try {
        const { data, error } = await supabase.functions.invoke("resolve-onboarding", {
          body: { ref: refToken, email, telefone },
        });
        if (error) throw error;
        setState((s) => ({
          ...s,
          status: data.status,
          leadId: data.lead_id,
          confianca: data.confianca,
          origemVinculo: data.origem_vinculo,
          needsPhone: data.needs_phone ?? false,
        }));
        return data;
      } catch (err) {
        setState((s) => ({ ...s, status: "idle", error: String(err) }));
        return null;
      }
    },
    [refToken]
  );

  const resolveByEvento = useCallback(
    async (email: string, telefone: string, rota_evento: string) => {
      setState((s) => ({ ...s, status: "resolving", error: null }));
      try {
        const { data, error } = await supabase.functions.invoke("resolve-onboarding", {
          body: { email, telefone, rota_evento },
        });
        if (error) throw error;
        setState((s) => ({
          ...s,
          status: data.status,
          leadId: data.lead_id,
          confianca: data.confianca,
          origemVinculo: data.origem_vinculo,
          needsPhone: false,
        }));
        return data;
      } catch (err) {
        setState((s) => ({ ...s, status: "idle", error: String(err) }));
        return null;
      }
    },
    []
  );

  return { ...state, resolveByEmail, resolveByPhone, resolveByEvento };
}
