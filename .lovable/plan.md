

## Formulário Multi-Step — Conferência Nacional em Créditos de Carbono

### Visão Geral
Formulário de pesquisa com 13 perguntas exibidas uma por vez, com navegação fluida, validações em tempo real e página de sucesso. Sem backend neste momento.

---

### 1. Schema e Dados das Perguntas
- Arquivo `src/lib/schemas/conferenciaCarbonoSchema.ts` com schema Zod, tipos e array `QUESTIONS` com as 13 perguntas (email, gênero, faixa etária, estado, enquadramento profissional, área de atuação, maior desafio, renda, tempo que conhece Dr. Sanquetta, estudo prévio, dificuldade, expectativa, assunto café)

### 2. Componentes Reutilizáveis (`src/components/form-conferencia/`)
- **QuestionContainer** — Card centralizado com título "CONFERÊNCIA NACIONAL EM CRÉDITOS DE CARBONO", barra de progresso (`Pergunta X de 13`), wrapper responsivo
- **TextQuestion** — Input para texto/email com placeholder e erro inline
- **TextareaQuestion** — Textarea com contador de caracteres e validação mínima
- **OptionsQuestion** — Botões de opção estilizados; ao clicar, auto-avança após 300ms
- **SelectQuestion** — Dropdown com os 27 estados; auto-avança após seleção

### 3. Página do Formulário (`/conferencia-carbono`)
- Controle de etapa com `currentStep`
- `react-hook-form` + `zodResolver` validando campo a campo com `trigger()`
- Navegação: botão "Voltar" e "Próximo" (oculto em perguntas de opções/select)
- Último step exibe botão "Finalizar"
- No submit: simula envio (600ms delay), salva em `localStorage` chave `conferencia-carbono-last-submission`, redireciona para página de sucesso
- Animação suave de fade entre perguntas
- Layout mobile-first, centralizado

### 4. Página de Sucesso (`/conferencia-carbono/sucesso`)
- Ícone de check verde, título "Resposta enviada com sucesso!", texto de agradecimento
- Botão "Voltar ao início" → `/conferencia-carbono`
- Botão secundário "Ver resumo salvo" → abre modal/card com dados do localStorage formatados

### 5. Rotas
- Adicionar `/conferencia-carbono` e `/conferencia-carbono/sucesso` no `App.tsx` com lazy loading

### Comportamentos-Chave
- Dados preservados ao navegar entre etapas
- Validação por campo antes de avançar
- Barra de progresso real
- Acessibilidade: labels, foco automático, navegação por teclado
- 100% frontend, sem dependências de backend

---

### Próximo Passo Sugerido (não implementado agora)
Na segunda etapa, conectar o formulário ao Supabase (tabela + insert) e disparar webhook para n8n via Edge Function após o submit.

