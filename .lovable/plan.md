

## Multi-rota com banners dinâmicos

### Arquivos novos
1. `src/assets/banner-protocolo.png` — imagem enviada (image-3.png)
2. `src/assets/banner-workshop.png` — imagem enviada (image-2.png)

### Arquivos alterados

**`src/components/form-conferencia/ConferenceHeroBanner.tsx`**
- Adicionar prop `variant?: "conferencia" | "protocolo" | "workshop"` (default `"conferencia"`)
- Importar os 3 banners e selecionar com um map simples

**`src/pages/ConferenciaCarbonoForm.tsx`**
- Ler `useLocation().pathname` para determinar o variant
- Passar `variant` ao `QuestionContainer` → `ConferenceHeroBanner`

**`src/components/form-conferencia/QuestionContainer.tsx`**
- Aceitar e repassar prop `variant` ao `ConferenceHeroBanner`

**`src/pages/ConferenciaCarbonoSucesso.tsx`**
- Ler pathname para determinar variant e passar ao banner

**`src/App.tsx`**
- Adicionar rotas:
  - `/protocolo-definitivo` → mesmo `ConferenciaCarbonoForm`
  - `/protocolo-definitivo/sucesso` → mesmo `ConferenciaCarbonoSucesso`
  - `/workshop-carbono` → mesmo `ConferenciaCarbonoForm`
  - `/workshop-carbono/sucesso` → mesmo `ConferenciaCarbonoSucesso`

### Lógica de variant
```text
pathname contém "protocolo" → "protocolo"
pathname contém "workshop"  → "workshop"
default                     → "conferencia"
```

### O que NÃO muda
- Perguntas, schema, validação, edge functions, Supabase, webhook, lógica de token — tudo idêntico.

