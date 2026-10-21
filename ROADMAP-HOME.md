<!-- Downshift by Tiago Vilas Boas · https://github.com/tiagovilasboas/downshift -->

# Roadmap: home as a product page (three levers)

Goal: the home sells three levers in this order — **1. model routing per subagent spawn, 2. native Compact, 3. DCI** — in a product tone (benefit first, status badge, one honest line). No new claims: every number already exists on the page or in the Downshift repo.

Scope: micro-adjustments of copy and order. Files: `pt-br/index.html` (source of truth), `index.html` (EN mirror), `llms.txt`. No new CSS or JS. If an inline `<style>`/`<script>` must change, recompute the sha256 in `vercel.json` (see README). Out of scope: redesign, caveat consolidation into a new component, README of the main repo.

Rules for everyone: keep section ids (`who problem features action dci compact flow layers evidence harnesses start faq`) and nav anchors working; keep Beta/status badges; never expand the author name beyond "Tiago Vilas Boas"; do not invent numbers; PT and EN say the same thing.

## Fronts and owners

| Front | Owner | Files | Done when |
|---|---|---|---|
| A. PT copy and order | senior-staff-fullstack | `pt-br/index.html` | items 1–8 below applied in PT |
| B. EN mirror, llms.txt | senior-staff-ai-finops (after A) | `index.html`, `llms.txt` | EN matches PT, item 9 fixed |
| C. Claims and CSP review (read-only) | senior-staff-appsec | all | every number traced to source; CSP hashes still valid |
| D. Verification (read-only) | senior-staff-qa | all | checklist at the end passes, screenshots desktop and mobile |

Order: A → B → C and D in parallel. A and B never edit the same file at once.

## Changes (final PT copy; EN in the next section)

1. **Hero subtitle** (replace the paragraph):
   "O Downshift é uma ferramenta gratuita e local para agentes de código como o Claude Code. Ele roda o trabalho mecânico dos subagentes em um modelo menor, enxuga a saída de comandos de rotina e, se você ativar, entrega ao agente só o código que a mudança toca. Sem chamar outra IA para decidir."
2. **Hero numbers order:** `~12%` first, then `0` extra AI calls, then `1.175`, then `232`. Labels unchanged.
3. **Three levers strip, order** Roteamento → Compact → DCI. Compact card text:
   "Saída limpa de comandos de rotina, como go test e git status, chega mais curta ao contexto. Erros, stack traces e saídas com falha ficam intactos."
   Badges unchanged (Verificado no Claude Code · Nativo, ligado por padrão · Opt-in, MVP).
4. **CTA after the strip:** a primary button "Instalar em um comando" linking to `#start`, with the line "Um binário em Go, sem daemon. O setup mostra o diff antes de gravar."
5. **Plan row in "Para quem é":** "Você usa um plano (Pro, Max, Team)" → "Não há fatura por token. O Downshift mostra quantos tokens rodaram em um modelo menor. O quanto isso estica o limite do seu plano ainda está sendo medido."
6. **Problem section** — title "Onde um agente de código gasta mais do que precisa." Intro "Três comportamentos de hoje. O Downshift, um único binário em Go sem daemon, atua em cada um." Three cards in this order:
   - *Subagentes herdam o seu modelo mais caro* — keep current text.
   - *A saída de rotina enche o contexto* — **O que acontece:** "Um go test que passou ou um git status limpo despejam dezenas de linhas repetidas no contexto do agente." **O que isso custa:** "Essas linhas ocupam contexto e viram tokens a cada turno em que continuam lá." **O que o Downshift faz:** "O downshift compact tira o ruído repetido de uma execução limpa. Erros, stack traces e saídas com falha ficam byte a byte iguais."
   - *O agente lê mais código do que a mudança precisa* — **O que acontece:** "Para mudar um símbolo, o agente costuma abrir arquivos inteiros e procurar quem o chama." **O que isso custa:** "Mais leitura é mais tokens de entrada e mais ruído no contexto." **O que o Downshift faz:** "O DCI (opt-in) calcula o raio de impacto e empacota só os símbolos afetados, dentro de um limite de bytes."
   The old card "A economia é mais anunciada do que medida" moves, text unchanged, to the top of the **evidence** section under the heading "Por que tratamos todo número como estimativa".
7. **Order everywhere:** section `#compact` before `#dci`; in the "O que você recebe" list Compact becomes item 2 and DCI item 3 (renumber); layers keep Compact before DCI; FAQ order unchanged.
8. **Compact section:** heading "Saída limpa, contexto menor." Lead: "A garantia vem antes do ganho: o que você precisa para depurar nunca é tocado." Column order: *O que nunca mexe* → *O que compacta* → *Medido, com honestidade*. Add a before/after block (reuse the component of the "Antes e depois: renomear uma variável" section, no new CSS) with **real output**: run `downshift compact -- go test ./internal/classify/` and the same `go test` raw in the Downshift repo, paste both, and caption: "Saída real em AAAA-MM-DD. Bytes, não tokens; tokens são bytes ÷ 4 (estimativa)." Keep the existing 259 → 118 bytes line as the second measurement. Do not invent lines.
9. **EN fix:** `index.html` "Who it is for" still says `downshift report shows dollars per completed task`; PT already says tokens. Change EN to "shows tokens per completed task, against a control group".

## EN copy (mirror of 1–8)

1. "Downshift is a free, local tool for coding agents such as Claude Code. It runs the mechanical work of subagents on a smaller model, trims the output of routine commands and, if you turn it on, hands the agent only the code a change touches. No other AI call to decide."
4. Button "Install in one command"; line "One Go binary, no daemon. Setup shows the diff before it writes."
5. "There is no per-token bill. Downshift shows how many tokens ran on a smaller model. How much that stretches your plan's limit is still being measured."
3. Compact card: "Clean output of routine commands, such as go test and git status, reaches the context shorter. Errors, stack traces and failing exits stay untouched."
6. Title "Where a coding agent spends more than it needs to." Intro "Three behaviors of today. Downshift, a single Go binary with no daemon, acts on each one." Cards: *Subagents inherit your most expensive model* (keep); *Routine output fills the context* — "A passing go test or a clean git status dumps dozens of repeated lines into the agent's context." / "Those lines take context and become tokens on every turn they stay there." / "downshift compact trims the repeated noise of a clean run. Errors, stack traces and failing output stay byte for byte the same."; *The agent reads more code than the change needs* — "To change one symbol, the agent often opens whole files and hunts for its callers." / "More reading is more input tokens and more noise in the context." / "DCI (opt-in) computes the blast radius and packs only the affected symbols, within a byte cap."; old "Savings are claimed more often than they are measured" moves to Evidence under "Why we treat every number as an estimate".
8. Heading "Clean output, smaller context." Lead "The guarantee comes before the gain: what you need to debug is never touched." Caption "Real output on YYYY-MM-DD. Bytes, not tokens; tokens are bytes ÷ 4 (estimate)."
- `llms.txt`: list Compact before DCI; no text changes beyond order.

## Verification checklist (front D)

- Section order in both pages: routing → compact → dci; nav and `#` anchors resolve; `sitemap.xml` untouched.
- PT and EN contain the same number of cards, steps and FAQ items; no PT string left in EN or the reverse.
- Every number (`~12%`, `56`, `1.175`, `232`, `259 → 118`, `927 → 3`) matches the page it came from or the Downshift repo; the new before/after output is reproducible.
- `vercel.json` CSP hashes still match the inline `<style>`/`<script>` (recompute and compare).
- Screenshots at 1280 px and 375 px: hero, three levers, problem, compact before/after; no horizontal scroll.
- No expanded author name anywhere (`grep`).

Delivery: one small PR, English commit messages, merge only with green CI on this personal repo.
