

## Onboarding com Vinculo Seguro — Plano de Implementacao

### Resumo

Criar um fluxo de vinculacao de respostas do formulario ao lead correto no banco de dados, usando um sistema de token (`?ref=`) como caminho rapido e fallback por e-mail/telefone quando o token nao estiver disponivel ou for invalido. O usuario nunca e bloqueado.

---

### Arquitetura do fluxo

```text
Abertura da pagina
       |
   ?ref=xxx na URL?
      / \
    SIM   NAO
     |      |
  Valida   Segue sem ref
  token    (fallback por email)
     |
  Valido? ──NAO──> fallback por email
     |
    SIM
     |
  lead_id resolvido (alta confianca)
     |
  [Usuario preenche formulario normalmente]
     |
  Ao submeter:
     |
  Edge function recebe {ref?, email, telefone?, respostas}
     |
  Resolve lead_id:
    1. token valido → grava (alta)
    2. email unico em compras → grava (media)
    3. email ambiguo → pede telefone
    4. email+telefone resolve → grava (media)
    5. sem resolucao → nao grava final, oferece recuperacao
```

---

### 1. Nova tabela: `onboarding_tokens`

Armazena tokens de acesso gerados e enviados via WhatsApp para cada comprador.

| Coluna | Tipo | Nota |
|---|---|---|
| id | uuid PK | gen_random_uuid() |
| lead_id | uuid NOT NULL | referencia leads.id |
| token | text NOT NULL UNIQUE | string curta (nanoid ~21 chars) |
| usado_em | timestamptz | null ate ser usado |
| criado_em | timestamptz | default now() |
| expira_em | timestamptz | default now() + 30 days |

RLS: desabilitado (acesso apenas via service_role no edge function).

Indice unico em `token`.

Nao bloqueia por expiracao — token expirado apenas reduz confianca e ativa fallback.

---

### 2. Edge Function: `resolve-onboarding`

Endpoint chamado pelo front para validar ref e/ou resolver lead por email.

**Entrada (POST):**
```json
{
  "ref": "abc123",        // opcional
  "email": "x@y.com",    // obrigatorio
  "telefone": "559..."   // opcional, enviado no desempate
}
```

**Logica:**
1. Se `ref` presente: buscar em `onboarding_tokens` join `leads` join `compras`
   - Se token valido e lead tem compra → retorna `{ status: "resolved", lead_id, confianca: "alta", origem: "token" }`
   - Se token expirado mas lead bate → retorna mesmo resultado com `confianca: "media"`
   - Se token invalido → segue para fallback
2. Fallback por email: buscar em `leads` join `compras` WHERE email = input
   - 1 resultado → `{ status: "resolved", lead_id, confianca: "media", origem: "email_fallback" }`
   - 0 resultados → `{ status: "not_found" }`
   - 2+ resultados → `{ status: "ambiguous", needs_phone: true }`
3. Se telefone fornecido (desempate): buscar leads com email + telefone
   - 1 resultado → `{ status: "resolved", lead_id, confianca: "media", origem: "email_telefone_fallback" }`
   - Senao → `{ status: "unresolved" }`

**Saida:**
```json
{
  "status": "resolved" | "not_found" | "ambiguous" | "unresolved",
  "lead_id": "uuid" | null,
  "confianca": "alta" | "media" | null,
  "origem_vinculo": "token" | "email_fallback" | "email_telefone_fallback" | null,
  "needs_phone": false
}
```

---

### 3. Edge Function: `submit-onboarding`

Recebe as respostas finais e grava no banco.

**Entrada (POST):**
```json
{
  "ref": "abc123",
  "email": "x@y.com",
  "telefone": "559...",
  "lead_id": "uuid",
  "origem_vinculo": "token",
  "confianca_vinculo": "alta",
  "respostas": {
    "genero": "Masculino",
    "faixaEtaria": "25 a 34",
    ...
  }
}
```

**Logica:**
1. Re-validar vinculo no backend (nao confiar no front):
   - Se ref presente, re-verificar token → lead_id
   - Senao, re-verificar email (e telefone) → lead_id
2. Se lead_id resolvido com confianca:
   - Inserir N linhas em `respostas_onboarding` (uma por chave_pergunta)
   - Marcar token como `usado_em = now()` (se aplicavel)
   - Retorna `{ status: "saved" }`
3. Se nao resolvido:
   - Inserir em nova tabela `onboarding_rascunhos` como rascunho para revisao manual
   - Retorna `{ status: "draft_saved", message: "..." }`

---

### 4. Nova tabela: `onboarding_rascunhos`

Armazena respostas pendentes de vinculacao manual.

| Coluna | Tipo |
|---|---|
| id | uuid PK |
| email | text NOT NULL |
| telefone | text |
| ref_tentado | text |
| respostas | jsonb NOT NULL |
| status | text DEFAULT 'pendente' |
| criado_em | timestamptz DEFAULT now() |

RLS desabilitado (service_role only).

---

### 5. Alteracoes no Frontend

#### 5.1 Schema (conferenciaCarbonoSchema.ts)
- Adicionar campo opcional `telefone` ao schema (usado apenas quando necessario para desempate)
- Adicionar pergunta de telefone ao array QUESTIONS (marcada como `conditional: true`, so aparece quando backend pede)

#### 5.2 Hook: `useOnboardingResolution` (novo)
Novo hook que encapsula a logica de resolucao:
- Le `?ref=` da URL via `useSearchParams`
- Expoe estado: `{ refToken, leadId, confianca, origem, needsPhone, status, resolveByEmail, resolveByPhone }`
- `resolveByEmail(email)`: chama `resolve-onboarding` com ref + email
- `resolveByPhone(telefone)`: chama novamente com telefone adicionado

#### 5.3 ConferenciaCarbonoForm.tsx
- Importar e usar `useOnboardingResolution`
- Apos o step de email (step 0), chamar `resolveByEmail(email)` automaticamente
- Se retorno `ambiguous` / `needs_phone`:
  - Injetar pergunta de telefone como proximo step
  - Ao responder, chamar `resolveByPhone(telefone)`
- Se retorno `not_found`:
  - Mostrar mensagem amigavel: "Nao localizamos sua compra. Verifique o e-mail ou solicite um novo link."
  - Botao para solicitar reenvio (link para suporte/WhatsApp)
  - Nao bloquear — usuario pode tentar outro email
- Se retorno `unresolved`:
  - Permitir envio mas informar que sera revisado manualmente
- No submit (`onSubmit`):
  - Chamar `submit-onboarding` em vez de gravar em localStorage
  - Enviar ref, email, telefone, lead_id, origem_vinculo, confianca, respostas
  - Tratar resposta: `saved` → sucesso, `draft_saved` → sucesso com aviso

#### 5.4 UX de mensagens
- Nunca travar: sempre oferecer caminho
- Mensagens inline (nao modal):
  - "Nao conseguimos validar automaticamente, confirme seu e-mail."
  - "Encontramos mais de um cadastro, confirme seu telefone."
  - "Se preferir, solicite um novo link agora."
- Usar componente de alerta sutil (banner amarelo/azul) dentro do card do formulario

#### 5.5 Pagina de Sucesso
- Remover leitura de localStorage
- Receber status de submissao via state do navigate (`navigate("/sucesso", { state: { status } })`)
- Se `draft_saved`: mostrar mensagem "Respostas recebidas, estao em analise de vinculacao"
- Se `saved`: mensagem padrao de sucesso

---

### 6. Configuracao do config.toml

Adicionar as duas funcoes com `verify_jwt = false` (acesso publico, sem auth do Supabase):

```toml
[functions.resolve-onboarding]
verify_jwt = false

[functions.submit-onboarding]
verify_jwt = false
```

---

### 7. Mapeamento de chaves de pergunta

As respostas serao gravadas em `respostas_onboarding` com `chave_pergunta` usando os IDs do schema atual:

| chave_pergunta | Pergunta |
|---|---|
| email | E-mail |
| genero | Qual o seu genero? |
| faixaEtaria | Qual sua faixa etaria? |
| estado | Qual seu estado? |
| enquadramentoProfissional | Enquadramento profissional |
| areaAtuacao | Area de atuacao |
| maiorDesafioArea | Maior desafio na area |
| rendaMensal | Renda mensal |
| conheceDrSanquettaHaQuantoTempo | Tempo que conhece Dr. Sanquetta |
| jaEstudouCreditosCarbono | Ja estudou creditos de carbono |
| maiorDificuldadeNoAssunto | Maior dificuldade (texto livre) |
| expectativaCursoInteresse | Expectativa com curso (texto livre) |
| assuntoPrincipalCafe | Assunto principal cafe (texto livre) |

`versao_formulario` = `"cncc-v2"`

---

### 8. Ordem de implementacao

1. Migration: criar tabelas `onboarding_tokens` e `onboarding_rascunhos`
2. Edge function `resolve-onboarding`
3. Edge function `submit-onboarding`
4. Config.toml com as duas funcoes
5. Hook `useOnboardingResolution`
6. Atualizar schema (campo telefone condicional)
7. Atualizar `ConferenciaCarbonoForm.tsx` (integracao completa)
8. Atualizar `ConferenciaCarbonoSucesso.tsx` (remover localStorage, usar state)
9. Testar fluxo completo

---

### Arquivos criados/alterados

| Arquivo | Acao |
|---|---|
| Migration SQL | Criar `onboarding_tokens` e `onboarding_rascunhos` |
| `supabase/functions/resolve-onboarding/index.ts` | Novo edge function |
| `supabase/functions/submit-onboarding/index.ts` | Novo edge function |
| `supabase/config.toml` | Adicionar config das 2 funcoes |
| `src/hooks/useOnboardingResolution.ts` | Novo hook |
| `src/lib/schemas/conferenciaCarbonoSchema.ts` | Adicionar telefone condicional |
| `src/pages/ConferenciaCarbonoForm.tsx` | Integrar hook, fallbacks, submit via edge fn |
| `src/pages/ConferenciaCarbonoSucesso.tsx` | Usar state em vez de localStorage |

