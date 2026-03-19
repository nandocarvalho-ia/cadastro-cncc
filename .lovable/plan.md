

## Fluxo de identificação por `?evento=`

### Resumo

Quando o lead chega com `?evento=` na URL (sem `?ref=`), exibir uma tela de identificação com e-mail e telefone obrigatórios antes das 13 perguntas. A edge function `resolve-onboarding` ganha uma nova branch que busca/cria o lead sem exigir compra.

### Alterações

#### 1. Nova edge function branch em `resolve-onboarding`

**Arquivo:** `supabase/functions/resolve-onboarding/index.ts`

Quando o body contém `rota_evento` (e não tem `ref`):
- Normalizar telefone para 13 dígitos (DDI 55)
- Extrair últimos 8 dígitos do telefone
- Buscar em `leads` por `email` OU por `ultimos_8` (match nos últimos 8 dígitos)
- Se encontrar 1 lead: retornar `resolved` com `lead_id`, e fazer `UPDATE` para preencher email ou telefone se estiver nulo
- Se encontrar múltiplos: tentar desempate por email+telefone combinados
- Se não encontrar: `INSERT` novo lead com `email`, `telefone` (normalizado), `origem_principal = 'formulario_manual'` → retornar `resolved`
- Não exige verificação de compra neste fluxo

#### 2. Novo componente `IdentificationScreen`

**Arquivo:** `src/components/form-conferencia/IdentificationScreen.tsx`

Tela com banner + card contendo:
- Campo e-mail (obrigatório, validação email)
- Campo telefone (obrigatório, formato brasileiro)
- Botão "Avançar"
- Usa o mesmo visual do `QuestionContainer` (banner + card branco)

Validação local com zod schema separado antes de chamar a edge function.

#### 3. Atualizar hook `useOnboardingResolution`

**Arquivo:** `src/hooks/useOnboardingResolution.ts`

- Ler `?evento=` dos search params
- Expor `eventoParam` no state
- Adicionar método `resolveByEvento(email, telefone, rota_evento)` que chama `resolve-onboarding` com `{ email, telefone, rota_evento }`
- Expor flag `isEventoFlow` (true quando `?evento=` existe e `?ref=` não existe)

#### 4. Atualizar `ConferenciaCarbonoForm`

**Arquivo:** `src/pages/ConferenciaCarbonoForm.tsx`

- Adicionar state `identified` (boolean, default `false` se evento flow, `true` se ref flow)
- Quando `!identified`: renderizar `IdentificationScreen` em vez do formulário de perguntas
- Ao avançar da tela de identificação: chamar `resolveByEvento`, se `resolved` → setar `identified = true` e iniciar as 13 perguntas (sem a pergunta de email inline, pois já foi coletado)
- No fluxo evento, remover as perguntas de email e telefone condicionais do activeQuestions (já coletados na tela de identificação), e pré-popular o email no form
- No `onSubmit`, passar o `email` e `telefone` coletados na identificação

#### 5. Atualizar `submit-onboarding`

**Arquivo:** `supabase/functions/submit-onboarding/index.ts`

- Quando recebe `rota_evento` no body (sem `ref`): usar a mesma lógica de busca por email/ultimos_8 para re-resolver o lead (não confiar no front)
- Se não encontrar, salvar rascunho normalmente

### O que NÃO muda
- Fluxo `?ref=TOKEN` permanece idêntico
- As 13 perguntas, schema, validação, webhook n8n — tudo igual
- Rotas no `App.tsx` — sem alteração

