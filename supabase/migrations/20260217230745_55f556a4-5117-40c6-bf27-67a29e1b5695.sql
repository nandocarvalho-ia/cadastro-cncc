
-- Tabela: onboarding_tokens
CREATE TABLE public.onboarding_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid NOT NULL REFERENCES public.leads(id),
  token text NOT NULL UNIQUE,
  usado_em timestamptz,
  criado_em timestamptz NOT NULL DEFAULT now(),
  expira_em timestamptz NOT NULL DEFAULT (now() + interval '30 days')
);

ALTER TABLE public.onboarding_tokens ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_onboarding_tokens_lead_id ON public.onboarding_tokens(lead_id);

-- Tabela: onboarding_rascunhos
CREATE TABLE public.onboarding_rascunhos (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  telefone text,
  ref_tentado text,
  respostas jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  criado_em timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.onboarding_rascunhos ENABLE ROW LEVEL SECURITY;
