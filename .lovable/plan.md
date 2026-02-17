

## Visual v2 — Premium Clean

Ajustes puramente visuais. Nenhuma alteracao em logica, validacao, schema, rotas ou navegacao.

---

### Arquivos alterados

| Arquivo | Mudanca |
|---|---|
| `ConferenceHeroBanner.tsx` | Banner compacto (100/130/170px), overlay 10%, margens menores |
| `QuestionContainer.tsx` | Remove titulo duplicado, layout min-h-[100dvh], card compacto max-w-[720px], glass clean, progress 6px, padding tight |
| `TextQuestion.tsx` | Input h-[46px], fonte menor |
| `TextareaQuestion.tsx` | Textarea rows 3, fonte menor |
| `SelectQuestion.tsx` | Trigger h-[46px] |
| `OptionsQuestion.tsx` | Padding e fonte menores, scroll interno max-h-[34vh]/[38vh] para listas longas |
| `ConferenciaCarbonoForm.tsx` | Botoes h-[44px], mt-4, microanimacao hover |
| `ConferenciaCarbonoSucesso.tsx` | Layout min-h-[100dvh] centralizado, card compacto, botoes h-[44px], sem titulo duplicado |
| `progress.tsx` | Altura 6px |

---

### Detalhes por componente

#### 1. ConferenceHeroBanner
- Alturas: `h-[100px] sm:h-[130px] lg:h-[170px]`
- Overlay: `bg-black/[0.10]`
- Margens: `mt-3 lg:mt-4 mb-3 md:mb-4`
- Manter rounded-2xl, object-cover, max-w-[1280px]

#### 2. QuestionContainer
- Wrapper externo: `min-h-[100dvh] flex flex-col items-center bg-[#F6F8FB] px-4 md:px-6 py-3 md:py-4`
- Remover bloco do titulo h1 e subtitulo (linhas 19-26) — ja esta no banner
- Container interno: `w-full max-w-[980px] mx-auto flex flex-col flex-1`
- Card: `w-full max-w-[720px] mx-auto bg-white/[0.92] backdrop-blur-[2px] border border-slate-200/80 shadow-[0_8px_30px_rgba(2,6,23,0.08)] rounded-2xl`
- CardHeader: padding compacto `px-4 md:px-5 pt-4 pb-2`
- "Pergunta X de Y" e percentual: `text-[13px] font-semibold text-slate-500`
- Progress: `h-1.5` (6px)
- CardContent: `px-4 md:px-5 pt-2 pb-4`

#### 3. Pergunta (label em todos os question components)
- `text-[22px] md:text-[24px] font-bold text-[#0B1220]`
- `space-y-2` em vez de `space-y-3`

#### 4. TextQuestion
- Input: `h-[46px]` (em vez de 52px)
- Manter focus ring e cores

#### 5. TextareaQuestion
- `rows={3}` (em vez de 4) para economizar espaco

#### 6. SelectQuestion
- Trigger: `h-[46px]`

#### 7. OptionsQuestion
- Botoes: `py-2.5 md:py-3 px-3.5` (menores)
- Texto: `text-[14px] md:text-[15px] leading-snug`
- Grid: `gap-1.5`
- Wrapper com scroll interno: `max-h-[34vh] md:max-h-[38vh] overflow-y-auto pr-1`
- Manter estados hover/selected/check

#### 8. Botoes de navegacao (ConferenciaCarbonoForm)
- Container: `mt-4` (em vez de mt-6)
- Primario (Proximo/Finalizar): `h-[44px] px-4 rounded-xl font-bold hover:-translate-y-[0.5px] transition-all`
- Secundario (Voltar): `h-[44px] px-3 rounded-[10px] text-slate-600 hover:bg-slate-100`
- Disabled: manter contraste e cursor

#### 9. Pagina de sucesso
- Wrapper: `min-h-[100dvh] flex flex-col items-center bg-[#F6F8FB] px-4 md:px-6 py-3 md:py-4`
- Banner compacto (mesmo componente)
- Card: `w-full max-w-[420px] mx-auto` com mesma linguagem glass clean
- Icone check: `w-14 h-14` (ligeiramente menor), `mb-3`
- Botoes: `h-[44px]`
- Reduzir espacamentos internos

#### 10. Progress bar
- Mudar className default de `h-2` para `h-1.5` no componente

---

### Resumo do impacto

- Banner 40-45% menor em altura, liberando area para o formulario
- Titulo duplicado removido
- Card mais compacto com padding tight e glass clean
- Campos e opcoes menores, com scroll interno para listas longas
- Botoes 44px em vez de 48px
- Maioria das perguntas cabe na viewport sem scroll da pagina
- Zero alteracoes em logica, validacao ou navegacao
