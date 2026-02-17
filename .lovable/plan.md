

## Refinamento Visual — Tema Carbono

Ajustes puramente visuais/estilizacao. Nenhuma alteracao em logica, validacao, schema ou rotas.

---

### Arquivos envolvidos

| Arquivo | O que muda |
|---|---|
| `src/assets/banner-conferencia.png` | Imagem do banner copiada para o projeto |
| `src/components/form-conferencia/ConferenceHeroBanner.tsx` | Novo componente de banner |
| `src/index.css` | Tokens de cor carbono + background geral + estilos de card/input/progress |
| `src/components/form-conferencia/QuestionContainer.tsx` | Banner no topo, max-w ampliado para 760px, tipografia refinada, progress bar customizada |
| `src/components/form-conferencia/TextQuestion.tsx` | Classes de estilo nos inputs (h-[52px], rounded-xl, focus ring verde, cores) |
| `src/components/form-conferencia/TextareaQuestion.tsx` | Mesmas classes de estilo do input |
| `src/components/form-conferencia/SelectQuestion.tsx` | Trigger com h-[52px], rounded-xl, focus ring verde |
| `src/components/form-conferencia/OptionsQuestion.tsx` | Estilo dos botoes de opcao: fundo branco, borda, hover verde, selecionado verde, microinteracao translateY |
| `src/pages/ConferenciaCarbonoForm.tsx` | Botoes Voltar/Proximo/Finalizar com estilos refinados (h-12, rounded-xl, cores carbon) |
| `src/pages/ConferenciaCarbonoSucesso.tsx` | Banner no topo, icone check em circulo verde, botoes com estilo harmonizado |
| `src/components/ui/progress.tsx` | Progress bar com h-2 por padrao, gradiente carbon-to-green, transicao suave |

---

### Detalhes tecnicos

#### 1. Banner
- Copiar imagem para `src/assets/banner-conferencia.png`
- Componente `ConferenceHeroBanner`: img com `w-full max-w-[1280px] rounded-[20px] object-cover` + overlay escuro via pseudo-elemento ou div absoluta com `bg-black/[0.14]`
- Alturas responsivas: `h-[140px] sm:h-[220px] lg:h-[300px]`
- Margens: `mt-5 lg:mt-7 mb-6`

#### 2. Tokens CSS (index.css)
Adicionar variaveis CSS customizadas no `:root`:
```
--carbon-900: 216 40% 8%;
--carbon-800: 218 43% 12%;
--carbon-700: 216 43% 19%;
--green-600: 122 46% 33%;
--green-500: 133 45% 44%;
--green-100: 130 38% 94%;
--slate-100: 210 18% 96%;
--slate-200: 214 18% 91%;
--text-700: 215 28% 27%;
--text-500: 215 16% 47%;
```
Cores em HSL para compatibilidade com o sistema existente.

Background geral das paginas de conferencia: `bg-[#F6F8FB]` (via classe Tailwind inline).

#### 3. Card do formulario
- `bg-white border-[#E7ECF3] shadow-[0_8px_24px_rgba(15,23,42,0.08)] rounded-2xl`

#### 4. Tipografia
- Titulo principal: `text-[22px] sm:text-[30px] font-extrabold tracking-[0.2px]` cor carbon-900
- Subtitulo: cor text-500, `text-[15px] sm:text-base`
- Label da pergunta: `text-[20px] sm:text-[22px] font-bold` cor carbon-900
- "Pergunta X de Y": font-medium cor text-500
- Percentual: font-semibold cor text-500

#### 5. Barra de progresso
- Modificar `Progress` component: trilho h-2 com bg slate-200 rounded-full
- Indicador com `background: linear-gradient(to right, #1A2A45, #2E7D32)` e `transition: transform 0.35s ease`

#### 6. Campos
- Input/Textarea/SelectTrigger: `h-[52px] rounded-xl border-[#D7DEE8]` + focus: `border-[#3FA34D] ring-4 ring-[rgba(63,163,77,0.18)]` + placeholder text-500 + text carbon-900

#### 7. Botoes de opcao
- Padrao: `bg-white border-[#DCE3EE] text-[#111B2E] rounded-xl`
- Hover: `bg-[#F8FBF8] border-[#3FA34D] -translate-y-[1px]`
- Selecionado: `bg-[#EAF6EC] border-[#2E7D32] text-[#2E7D32]` com check icon

#### 8. Botoes de navegacao
- Proximo/Finalizar: `h-12 px-5 rounded-xl bg-[#0B1220] text-white font-bold hover:bg-[#111B2E] active:bg-[#1A2A45]`
- Disabled: `bg-[#CBD5E1] text-[#94A3B8]`
- Voltar: ghost com `text-[#64748B] hover:bg-[#EEF2F7] hover:text-[#111B2E] active:bg-[#E2E8F0] rounded-xl`

#### 9. Pagina de sucesso
- Banner no topo (mesmo componente)
- Check icon dentro de circulo `bg-[#EAF6EC]` com icone `text-[#2E7D32]`
- Card com mesma linguagem visual
- CTA primario com estilo carbon
- CTA secundario com borda verde suave

#### 10. Animacao de entrada
- Atualizar keyframe fade-in para `translateY(6px)` com duracao 220ms
