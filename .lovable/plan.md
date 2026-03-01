

## Enviar telefone do lead para webhook apos formulario

### O que sera feito

Adicionar uma chamada ao webhook `https://n8n-n8n.frxa1g.easypanel.host/webhook/qualifica-lead-onboarding` na edge function `submit-onboarding`, disparada apos a gravacao bem-sucedida das respostas (tanto no fluxo "saved" quanto no "draft_saved").

### Dados enviados ao webhook

```json
{
  "telefone": "559...",
  "email": "x@y.com",
  "lead_id": "uuid ou null",
  "status": "saved" | "draft_saved",
  "origem_vinculo": "token" | "email_fallback" | ... | null,
  "confianca": "alta" | "media" | null
}
```

### Alteracao tecnica

**Arquivo:** `supabase/functions/submit-onboarding/index.ts`

1. Definir a URL do webhook como constante no topo do arquivo
2. Criar uma funcao auxiliar `notifyWebhook()` que faz um `fetch POST` para o webhook com os dados do lead
3. Chamar `notifyWebhook()` em dois pontos:
   - Apos gravar com sucesso em `respostas_onboarding` (status "saved", linha ~121)
   - Apos gravar rascunho em `onboarding_rascunhos` (status "draft_saved", linha ~144)
4. O envio ao webhook sera fire-and-forget (nao bloqueia nem impede o retorno ao usuario em caso de falha do webhook). Erros serao logados no console mas nao afetam a resposta.

### Nenhuma outra alteracao necessaria

- Nao precisa de novo secret (a URL do webhook e publica)
- Nao precisa de migration
- Nao precisa de alteracao no frontend

