# Spike: Migração downshift-site para SvelteKit PWA

**Data:** 2026-10-22
**Autor:** Tiago Vilas Boas
**Status:** Draft

---

## Objetivo

Transformar o site estático atual (37 arquivos HTML com CSS inline) em um PWA completo usando SvelteKit, mantendo **100% do design visual existente** — mesmos tokens CSS, mesmas classes, mesma estrutura HTML.

---

## Inventário Atual

### Assets a Preservar (1:1)

| Tipo | Arquivos | Ação |
|------|----------|------|
| CSS Variables | `:root` com 15 tokens | Extrair para `app.css` |
| CSS Classes | ~200 classes (.btn, .hero, .term, etc) | Extrair para `app.css` |
| Fontes | Geist Variable, Geist Mono | Copiar para `static/fonts/` |
| Ícones SVG | Sprite `#im`, `#is`, `#ic`, etc | Componente `SvgSprite.svelte` |
| Logos | `downshift-logo-dark.svg`, `downshift-logo-light.svg` | `static/` |
| PWA | `manifest.webmanifest`, `sw.js`, icons | Migrar para `@vite-pwa/sveltekit` |
| OG Images | `og.png`, `og-pt.png` | `static/` |
| Web Component | `ds-chat.js` (15KB) | Converter para Svelte component |

### Páginas (37 rotas)

```
/                           # Home EN
/pt-br/                     # Home PT-BR
/docs/                      # Docs index
/docs/[slug]/               # 20 docs pages
/guides/                    # Guides index
/guides/[slug]/             # 10 guides pages
/pt-br/guias/               # PT-BR guides index
/pt-br/guias/[slug]/        # 3 PT-BR guides
/pt-br/docs/install/        # 1 PT-BR doc
/components/demo/           # Demo page
```

---

## Arquitetura Proposta

### Estrutura de Diretórios (Screaming Architecture)

```
downshift-site/
├── src/
│   ├── lib/
│   │   ├── components/           # UI components
│   │   │   ├── layout/
│   │   │   │   ├── Header.svelte
│   │   │   │   ├── Footer.svelte
│   │   │   │   ├── Nav.svelte
│   │   │   │   └── MobileMenu.svelte
│   │   │   ├── ui/
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Pill.svelte
│   │   │   │   ├── Terminal.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   └── Icon.svelte
│   │   │   ├── home/
│   │   │   │   ├── Hero.svelte
│   │   │   │   ├── DiagramSvg.svelte
│   │   │   │   ├── Features.svelte
│   │   │   │   ├── Evidence.svelte
│   │   │   │   └── Faq.svelte
│   │   │   └── docs/
│   │   │       ├── DocLayout.svelte
│   │   │       ├── TableOfContents.svelte
│   │   │       └── CodeBlock.svelte
│   │   ├── stores/               # Svelte stores
│   │   │   ├── theme.ts          # Dark/light mode
│   │   │   └── i18n.ts           # Locale state
│   │   ├── utils/                # Pure functions
│   │   │   ├── clipboard.ts
│   │   │   └── analytics.ts
│   │   └── types/                # TypeScript types
│   │       ├── content.ts
│   │       └── components.ts
│   ├── routes/
│   │   ├── +layout.svelte        # Root layout (header, footer)
│   │   ├── +layout.ts            # Load locale
│   │   ├── +page.svelte          # Home EN
│   │   ├── docs/
│   │   │   ├── +page.svelte      # Docs index
│   │   │   └── [slug]/
│   │   │       └── +page.svelte  # Dynamic doc
│   │   ├── guides/
│   │   │   ├── +page.svelte
│   │   │   └── [slug]/
│   │   │       └── +page.svelte
│   │   └── pt-br/
│   │       ├── +page.svelte      # Home PT-BR
│   │       ├── guias/
│   │       │   ├── +page.svelte
│   │       │   └── [slug]/
│   │       │       └── +page.svelte
│   │       └── docs/
│   │           └── install/
│   │               └── +page.svelte
│   ├── app.html                  # HTML template
│   ├── app.css                   # Global CSS (extracted)
│   └── hooks.server.ts           # Security headers
├── static/
│   ├── fonts/
│   │   ├── Geist-Variable.woff2
│   │   └── GeistMono-Variable.woff2
│   ├── favicon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   ├── og.png
│   ├── og-pt.png
│   ├── downshift-logo-dark.svg
│   ├── downshift-logo-light.svg
│   └── robots.txt
├── content/                      # Markdown content (optional)
│   ├── docs/
│   └── guides/
├── tests/
│   ├── unit/
│   │   └── *.test.ts
│   └── e2e/
│       └── *.spec.ts
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── .prettierrc
├── playwright.config.ts
└── package.json
```

### Stack Técnica

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Framework | SvelteKit 2.x | SSG, file-based routing, adapters |
| Build | Vite 5.x | Já incluído no SvelteKit |
| Tipos | TypeScript 5.x strict | Type safety |
| Lint | ESLint 9 flat config | Código consistente |
| Format | Prettier + prettier-plugin-svelte | Formatação |
| PWA | @vite-pwa/sveltekit | Service worker, manifest |
| CSS | CSS puro (extraído do atual) | Zero alteração visual |
| Adapter | @sveltejs/adapter-static | Deploy Vercel/Netlify |
| Test Unit | Vitest | Fast, Vite-native |
| Test E2E | Playwright | Browser testing |

---

## Configurações

### tsconfig.json

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noPropertyAccessFromIndexSignature": true,
    "forceConsistentCasingInFileNames": true,
    "verbatimModuleSyntax": true,
    "moduleResolution": "bundler",
    "module": "ESNext",
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "checkJs": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src/**/*.ts", "src/**/*.js", "src/**/*.svelte", "tests/**/*.ts"]
}
```

> **Nota:** Não redefinir `paths` — SvelteKit já configura `$lib` automaticamente via `.svelte-kit/tsconfig.json`. Aliases extras (`$components`, etc.) vão no `svelte.config.js`.

### eslint.config.js

```javascript
import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs['flat/recommended'],
  ...svelte.configs['flat/prettier'],
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        parser: ts.parser
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  { ignores: ['build/', '.svelte-kit/', 'node_modules/', 'dist/'] }
);
```

> **Nota:** Começar com `ts.configs.recommended` em vez de `strictTypeChecked` — adicionar regras strict incrementalmente após o scaffold funcionar. `svelte.configs['flat/prettier']` evita conflitos ESLint/Prettier.

### svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,  // SSG puro, sem SPA fallback
      precompress: true,
      strict: true
    }),
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils'
    },
    prerender: {
      entries: ['*'],  // Prerenderiza todas as rotas descobertas
      handleHttpError: 'warn',
      handleMissingId: 'warn'
    }
  }
};

export default config;
```

> **Nota:** CSP removido do config — configurar via `hooks.server.ts` ou `vercel.json` para ter controle mais granular e evitar quebrar o service worker.

### .prettierrc

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-svelte"],
  "overrides": [
    {
      "files": "*.svelte",
      "options": { "parser": "svelte" }
    }
  ]
}
```

### vite.config.ts

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      manifest: {
        name: 'Downshift',
        short_name: 'Downshift',
        description: 'Deterministic model router and token optimization for AI coding agents.',
        start_url: '/?source=pwa',
        scope: '/',
        display: 'standalone',
        background_color: '#0A0A0A',
        theme_color: '#0A0A0A',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: null  // SSG, não precisa de fallback
      },
      devOptions: {
        enabled: true  // Testar PWA em dev
      }
    })
  ]
});
```

> **Nota:** Removido `runtimeCaching` — para SSG simples, o `globPatterns` cobre os assets. Cache de navegação será avaliado após o MVP funcionar.

---

## Roadmap

1. **Scaffold** — SvelteKit + TypeScript + ESLint + Prettier + assets
2. **Layout** — Header, Footer, Nav, mobile menu
3. **Home** — Hero, diagrama SVG, Terminal, Features, FAQ, DsChat
4. **Docs/Guides** — Rotas dinâmicas, layout de docs
5. **i18n** — Store de locale, `/pt-br/`
6. **PWA** — vite-pwa, service worker
7. **Deploy** — Vercel, redirects

---

## Migração do CSS

O CSS atual está inline em cada HTML (~35KB minificado). Estratégia:

1. **Extrair CSS único** do `index.html` para `src/app.css`
2. **Manter todas as classes** — nenhuma renomeação
3. **Manter CSS variables** no `:root`
4. **Manter media queries** de light mode e responsividade

```css
/* src/app.css - início */
@font-face {
  font-family: 'Geist';
  src: url('/fonts/Geist-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
/* ... resto do CSS extraído ... */
```

---

## Migração do Web Component ds-chat

O `ds-chat.js` é um Web Component (~15KB) que renderiza um chat demo interativo. Duas opções:

### Opção A: Manter como Web Component

```svelte
<!-- DsChatWrapper.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  onMount(async () => {
    await import('$lib/components/ds-chat.js');
  });
</script>

<ds-chat class="dc">
  <script type="application/json">
    {JSON.stringify(scenariosData)}
  </script>
</ds-chat>
```

### Opção B: Converter para Svelte (recomendado)

```svelte
<!-- DsChat.svelte -->
<script lang="ts">
  import type { Scenario, Message } from '$types/content';
  
  export let scenarios: Scenario[];
  
  let currentScenario = 0;
  let messages: Message[] = [];
  let isPlaying = false;
  
  async function playScenario(): Promise<void> {
    // ... lógica de replay
  }
</script>

<div class="dc" role="region" aria-label="Chat demo">
  <!-- ... markup do chat ... -->
</div>
```

---

## Riscos

| Risco | Mitigação |
|-------|-----------|
| CSS não renderiza igual | Screenshot diff antes do merge |
| Animações SVG quebram | Testar diagrama cedo |
| SEO regride | Manter meta tags, Lighthouse |

---

## Critérios de Aceite

- Visual idêntico ao atual
- Lighthouse > 90 em todas as categorias
- PWA instalável
- [ ] Service worker funcional offline
- [ ] TypeScript strict sem erros
- [ ] ESLint sem warnings
- [ ] Testes E2E passando em todas as rotas

---

## Dependências do package.json

```json
{
  "name": "downshift-site",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
    "check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "validate": "pnpm check && pnpm lint && pnpm test"
  },
  "devDependencies": {
    "@eslint/js": "^9.12.0",
    "@playwright/test": "^1.48.0",
    "@sveltejs/adapter-static": "^3.0.6",
    "@sveltejs/kit": "^2.7.0",
    "@sveltejs/vite-plugin-svelte": "^4.0.0",
    "@vite-pwa/sveltekit": "^0.6.5",
    "eslint": "^9.12.0",
    "eslint-plugin-svelte": "^2.44.1",
    "globals": "^15.11.0",
    "prettier": "^3.3.3",
    "prettier-plugin-svelte": "^3.2.7",
    "svelte": "^5.1.0",
    "svelte-check": "^4.0.4",
    "typescript": "^5.6.3",
    "typescript-eslint": "^8.8.1",
    "vite": "^5.4.9",
    "vitest": "^2.1.2"
  }
}
```

> **Notas:**
> - Removido `svelte-eslint-parser` (já incluído no `eslint-plugin-svelte`)
> - Removido `@types/node` (não necessário para frontend puro)
> - Adicionado script `validate` para CI
> - Versões atualizadas para outubro 2026

---

## Próximos Passos

1. Aprovar spike
2. Criar branch `feat/sveltekit-migration`
3. Executar Fase 1 (scaffold)
4. Validar CSS extraído renderiza igual
5. Prosseguir com demais fases
