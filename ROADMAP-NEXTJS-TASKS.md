# Downshift Site — Roadmap de Migração Next.js

**Repo:** `/Users/tiago.boas/Github/downshift-site`
**Branch:** `main`
**Última atualização:** 2026-10-22

---

## Status por Milestone

| # | Milestone | Status | Estimativa base | Com buffer | Commit |
|---|-----------|--------|----------------|------------|--------|
| 1 | Monorepo Foundation | ✅ DONE | 3h | 4.5h | 333de47 |
| 2 | Site Marketing | 🔲 TODO | 6h | 9h | — |
| 3 | Componentes Interativos | 🔲 TODO | 4h | 6h | — |
| 4 | Docs App | 🔲 TODO | 5h | 7.5h | — |
| 5 | SEO e Polish | 🔲 TODO | 3h | 4.5h | — |
| 6 | Deploy e Validação | 🔲 TODO | 4h | 6h | — |

**Progresso:** 1/6 milestones (17% concluído)

---

## Milestone 1 — Monorepo Foundation ✅

**Commit:** 333de47 | **Duração real:** ~2.5h

### Entregues
- [x] `turbo.json` — build/dev/lint/type-check com cache
- [x] `pnpm-workspace.yaml` — apps/* + packages/*
- [x] `packages/config` — Tailwind preset (tokens CSS), TS base + nextjs configs
- [x] `packages/ui` — Button, Badge, Card, Terminal, CopyButton + globals.css
- [x] `apps/site` — Next.js 15.5 skeleton + next-intl (en + pt-BR)
- [x] `apps/docs` — Next.js 15.5 skeleton + MDX + rehype-pretty-code
- [x] `tsc --noEmit` limpo em todos os 4 packages

---

## Milestone 2 — Site Marketing 🔲

**Estimativa:** 6h base / 9h com buffer
**Dependência:** M1 ✅
**QA:** Screenshot 1280px + 375px ao fim de cada seção

### Tasks em ordem de execução

| ID | Task | Estimativa | QA |
|----|------|------------|-----|
| 2.1 | Header: nav links, logo, lang switcher, hamburger mobile | 1h | Screenshot mobile |
| 2.2 | Footer: links, copyright, social | 30min | Visual check |
| 2.3 | Hero: badge, H1, subtitle, stats row (4 números), CTA buttons | 1.5h | 1280+375px |
| 2.4 | Features strip: 3 cards (Roteamento/Compact/DCI) com badges | 45min | Cards alinhados |
| 2.5 | Problem section: título, intro, 3 cards | 45min | Cards responsivos |
| 2.6 | Evidence section: metodologia + números com caveat | 30min | Checagem de números |
| 2.7 | Install section: terminal, copy button, diff antes/depois | 45min | Copy funciona |
| 2.8 | FAQ section: accordion expandir/colapsar | 30min | Interação |
| 2.9 | i18n: todas as strings em en.json + pt-BR.json | 45min | /pt-br renderiza |

**Checkpoint:** Site EN e PT-BR renderizam visualmente iguais ao index.html atual.

### Bugs prioritários se encontrados
1. **Layout quebrado mobile** (375px) — bloqueia antes de avançar para M3
2. **Tokens CSS não aplicados** (fundo errado, cor errada) — bloqueia
3. **i18n routing quebrado** (/pt-br 404) — bloqueia
4. **Hidratação SSR/CSR** (flash de conteúdo) — corrige antes de M5

---

## Milestone 3 — Componentes Interativos 🔲

**Estimativa:** 4h base / 6h com buffer
**Dependência:** M2 ✅
**Pode rodar em paralelo com M4**

| ID | Task | Estimativa | QA |
|----|------|------------|-----|
| 3.1 | SVG routing visualization: migrar de HTML/JS para React component | 1.5h | Replay funciona |
| 3.2 | `packages/ds-chat`: migrar vanilla JS para React + TypeScript | 2h | Todos cenários |
| 3.3 | Integrar ds-chat em apps/site | 30min | Demo interativo |

**Checkpoint:** Demo de roteamento anima corretamente; ds-chat abre e fecha cenários.

---

## Milestone 4 — Docs App 🔲

**Estimativa:** 5h base / 7.5h com buffer
**Dependência:** M1 ✅
**Pode rodar em paralelo com M3**

| ID | Task | Estimativa | QA |
|----|------|------------|-----|
| 4.1 | Sidebar navigation component com hierarquia | 1h | Navegação mobile |
| 4.2 | Table of Contents com scroll spy | 45min | Destaca heading ativo |
| 4.3 | MDX components: callout, code blocks, tabela | 1h | Syntax highlighting |
| 4.4 | Migrar 11 docs HTML → MDX (preservar conteúdo) | 1.5h | Cada URL responde |
| 4.5 | Migrar 9 guides HTML → MDX (preservar conteúdo) | 45min | Cada URL responde |

**Checkpoint:** Todas as 20 URLs de docs/guides respondem com conteúdo correto.

---

## Milestone 5 — SEO e Polish 🔲

**Estimativa:** 3h base / 4.5h com buffer
**Dependência:** M2 + M4 ✅

| ID | Task | Estimativa | QA |
|----|------|------------|-----|
| 5.1 | Metadata API: title, description, keywords em todas as pages | 30min | `<title>` correto |
| 5.2 | Structured Data JSON-LD: SoftwareApplication + FAQPage | 30min | Schema válido |
| 5.3 | Sitemaps dinâmicos: apps/site/sitemap.ts + apps/docs/sitemap.ts | 30min | /sitemap.xml 200 |
| 5.4 | OG Image dinâmico: /og route com ImageResponse | 45min | 1200×630 renderiza |
| 5.5 | robots.txt + llms.txt atualizados para Next.js | 15min | Crawlers permitidos |
| 5.6 | Vercel Analytics + Speed Insights ativos | 15min | Eventos no dashboard |
| 5.7 | Lighthouse audit e otimizações (Performance 95+) | 15min | Score documentado |

**Checkpoint:** Lighthouse SEO 100; Performance 95+; structured data válido.

---

## Milestone 6 — Deploy e Validação 🔲

**Estimativa:** 4h base / 6h com buffer
**Dependência:** M5 ✅

| ID | Task | Estimativa | QA |
|----|------|------------|-----|
| 6.1 | `vercel.json` multi-app: rewrites /docs/* + CSP headers | 1h | Preview URL responde |
| 6.2 | Script CSP hashes atualizado para apps/site | 30min | Sem erros de console |
| 6.3 | Fontes: copiar Geist para apps/site/public + apps/docs/public | 15min | FOUT ausente |
| 6.4 | Assets: favicon, og.png, manifest.webmanifest | 15min | PWA instalável |
| 6.5 | Vercel preview deploy: testar routing real | 30min | /docs, /pt-br, / ok |
| 6.6 | Screenshots finais: desktop (1280px) + mobile (375px) | 30min | Evidência em PR |
| 6.7 | Validar todos os links internos (sem 404) | 15min | grep hrefs |
| 6.8 | PR final com screenshots | 15min | CI verde |

**Checkpoint:** Deploy em preview URL; todas as seções; CI verde; PR aberto.

---

## Protocolo de Loop Engineer

### Ciclo por seção

```
IMPLEMENT → tsc --noEmit → dev server → screenshot → commit
     ↑                                                    |
     └── se bug bloqueante: debug → fix → retorna ao tsc ─┘
```

### Critério de bug bloqueante

| Severidade | Critério | Ação |
|------------|----------|------|
| 🔴 Bloqueia | Layout quebrado, 404, tsc error, token CSS errado | Fix antes de avançar |
| 🟡 Prioridade alta | Animação não funciona, hover errado, mobile descalibrado | Fix na mesma wave |
| 🟢 Pode esperar | Micro-ajuste visual, wording, spacing | Acumula para polish |

### Evidência obrigatória por milestone

| Milestone | Evidências |
|-----------|------------|
| M2 | Screenshot hero 1280px, hero 375px, features strip, FAQ aberto |
| M3 | GIF/screenshot do routing viz animando, ds-chat cenário ativo |
| M4 | Screenshot sidebar docs desktop, docs mobile |
| M5 | Lighthouse report, structured data validator |
| M6 | Screenshot final site completo desktop + mobile |

### Regras
- Nunca merge para main sem tsc limpo
- Nunca avança milestone sem checkpoint verificado
- Nunca inventa número — todos os dados vêm de index.html ou repo downshift
- Screenshots com playwright-cli via `playwright-cli screenshot` (path impresso)

---

## Wave Plan (execução paralela)

```
Wave 1 (agora):
  └── M2: Site Marketing [6h]

Wave 2 (após M2):
  ├── M3: Componentes Interativos [4h]  ← paralelo
  └── M4: Docs App [5h]                 ← paralelo

Wave 3 (após M2+M3+M4):
  └── M5: SEO e Polish [3h]

Wave 4 (após M5):
  └── M6: Deploy e Validação [4h]
```

**Total estimado:** 22h base / 33h com buffer
**M1 concluído:** 2.5h real

---

## Próximo passo imediato

**Task 2.1 — Header**
- Ler o header atual de `index.html` (linhas do `<header>`)
- Implementar em `apps/site/src/app/[locale]/components/header.tsx`
- Links: problema, features, action, flow, layers, evidence, docs, GitHub, lang switcher
- Mobile: hamburger menu (checkbox + CSS, sem JS extra)
- tsc → screenshot 1280px + 375px → commit
