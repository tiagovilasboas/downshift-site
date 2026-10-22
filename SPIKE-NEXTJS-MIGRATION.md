# Spike: Migração para Next.js + Tailwind + Motion + shadcn/ui

**Data:** 2026-10-22
**Objetivo:** Migrar o downshift-site de HTML estático para Next.js 15, mantendo 100% do layout atual, adicionando SEO agressivo, branding profissional e fundação para marketing.

---

## Arquitetura: Monorepo com Duas Apps

```
downshift-site/
├── apps/
│   ├── site/                        # Landing page marketing
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx         # Home EN
│   │   │   │   └── components/
│   │   │   ├── pt-br/
│   │   │   │   └── page.tsx         # Home PT-BR
│   │   │   ├── layout.tsx
│   │   │   ├── sitemap.ts
│   │   │   ├── robots.ts
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── marketing/           # Hero, features, problem, etc.
│   │   │   └── layout/              # Header, footer (site-specific)
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   └── package.json
│   │
│   └── docs/                        # Documentação técnica
│       ├── app/
│       │   ├── page.tsx             # Docs index
│       │   ├── [[...slug]]/
│       │   │   └── page.tsx         # Dynamic docs pages
│       │   ├── layout.tsx
│       │   ├── sitemap.ts
│       │   └── globals.css
│       ├── components/
│       │   ├── mdx/                 # MDX components
│       │   ├── navigation/          # Sidebar, TOC, breadcrumbs
│       │   └── layout/              # Header, footer (docs-specific)
│       ├── content/
│       │   ├── docs/                # MDX: install, config, architecture...
│       │   └── guides/              # MDX: claude-code-*, tutorials
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       └── package.json
│
├── packages/
│   ├── ui/                          # shadcn/ui compartilhado
│   │   ├── components/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── terminal.tsx
│   │   │   └── copy-button.tsx
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── config/                      # Configs compartilhadas
│   │   ├── tailwind/
│   │   │   └── preset.ts            # Tokens, theme, animations
│   │   ├── typescript/
│   │   │   └── base.json
│   │   └── package.json
│   │
│   └── ds-chat/                     # Web component interativo
│       ├── ds-chat.tsx              # Migrado de vanilla JS
│       ├── scenarios.ts
│       ├── package.json
│       └── tsconfig.json
│
├── turbo.json                       # Turborepo config
├── pnpm-workspace.yaml
├── package.json                     # Root package
└── vercel.json                      # Multi-project deployment
```

---

## Stack Final

| Camada | Escolha | Justificativa |
|--------|---------|---------------|
| Monorepo | Turborepo + pnpm | Build caching, task orchestration |
| Framework | Next.js 15 (App Router) | SSG/ISR, metadata API, best-in-class SEO |
| Styling | Tailwind CSS v4 + CSS custom properties | Mantém design system atual, tokens nativos |
| Components | shadcn/ui (packages/ui) | Acessível, unstyled, composable, compartilhado |
| Motion | Motion (ex-Framer Motion) | Animações declarativas, AI Kit integrado |
| MDX | @next/mdx + contentlayer | Docs e guides em MDX |
| Fonts | Geist (já em uso) | Mantém identidade visual |
| i18n | next-intl (site) | PT-BR/EN com routing nativo |
| Analytics | Vercel Analytics + Speed Insights | Zero-config, privacy-first |
| Deployment | Vercel Multi-project | Um deploy, duas apps |

---

## Domínios e Routing

| App | Domínio | Paths |
|-----|---------|-------|
| site | downshift-ai.vercel.app | `/`, `/pt-br` |
| docs | downshift-ai.vercel.app/docs | `/docs/*`, `/guides/*`, `/pt-br/guias/*` |

```json
// vercel.json
{
  "rewrites": [
    { "source": "/docs/:path*", "destination": "/docs/:path*" },
    { "source": "/guides/:path*", "destination": "/docs/guides/:path*" },
    { "source": "/pt-br/guias/:path*", "destination": "/docs/pt-br/guias/:path*" },
    { "source": "/:path*", "destination": "/site/:path*" }
  ]
}
```

---

## Configuração do Monorepo

### Root package.json

```json
{
  "name": "downshift-site",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "type-check": "turbo type-check"
  },
  "devDependencies": {
    "turbo": "^2.2.0"
  },
  "packageManager": "pnpm@9.0.0"
}
```

### pnpm-workspace.yaml

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

---

## Package: UI Compartilhado

### packages/ui/package.json

```json
{
  "name": "@downshift/ui",
  "version": "0.0.1",
  "private": true,
  "exports": {
    "./button": "./components/button.tsx",
    "./card": "./components/card.tsx",
    "./badge": "./components/badge.tsx",
    "./terminal": "./components/terminal.tsx",
    "./copy-button": "./components/copy-button.tsx",
    "./globals.css": "./globals.css"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@downshift/config": "workspace:*",
    "typescript": "^5.6.0"
  }
}
```

### packages/config/tailwind/preset.ts

```ts
import type { Config } from 'tailwindcss';

export const downshiftPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--b)',
        card: 'var(--c)',
        border: 'var(--l)',
        'border-muted': 'var(--l2)',
        foreground: 'var(--f)',
        title: 'var(--t)',
        muted: 'var(--m)',
        accent: 'var(--a)',
        ring: 'var(--r)',
        hint: 'var(--h)',
        'primary-bg': 'var(--pb)',
        'primary-fg': 'var(--pf)',
        'secondary-bg': 'var(--sb)',
        'secondary-fg': 'var(--sf)',
        line: 'var(--li)',
      },
      fontFamily: {
        sans: ['var(--ss)', 'system-ui', 'sans-serif'],
        mono: ['var(--mo)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gear-spin': 'gearSpin 48s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gearSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
};
```

---

## App: Site (Marketing)

### apps/site/package.json

```json
{
  "name": "@downshift/site",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@downshift/ui": "workspace:*",
    "@vercel/analytics": "^1.3.0",
    "@vercel/speed-insights": "^1.0.0",
    "motion": "^11.11.0",
    "next": "15.0.0",
    "next-intl": "^3.20.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@downshift/config": "workspace:*",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

### apps/site/tailwind.config.ts

```ts
import type { Config } from 'tailwindcss';
import { downshiftPreset } from '@downshift/config/tailwind/preset';

const config: Config = {
  presets: [downshiftPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../packages/ui/**/*.{ts,tsx}',
  ],
};

export default config;
```

### apps/site/app/layout.tsx

```tsx
import '@downshift/ui/globals.css';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { StructuredData } from '@/components/structured-data';

export const metadata: Metadata = {
  metadataBase: new URL('https://downshift-ai.vercel.app'),
  title: {
    default: 'Downshift: Claude Code routing, Compactor and DCI',
    template: '%s | Downshift',
  },
  description: 'Free, local tool for Claude Code. Right model per subagent, shorter clean output, only the code a change touches.',
  // ... resto do metadata (ver seção SEO)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## App: Docs (Documentação)

### apps/docs/package.json

```json
{
  "name": "@downshift/docs",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev --port 3001",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@downshift/ui": "workspace:*",
    "@next/mdx": "^15.0.0",
    "@vercel/analytics": "^1.3.0",
    "next": "15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "rehype-pretty-code": "^0.13.0",
    "rehype-slug": "^6.0.0",
    "remark-gfm": "^4.0.0"
  },
  "devDependencies": {
    "@downshift/config": "workspace:*",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

### apps/docs/next.config.ts

```ts
import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          keepBackground: false,
        },
      ],
    ],
  },
});

const nextConfig = {
  basePath: '/docs',
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  experimental: {
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
```

### apps/docs/app/layout.tsx

```tsx
import '@downshift/ui/globals.css';
import './globals.css';
import { Sidebar } from '@/components/navigation/sidebar';
import { TableOfContents } from '@/components/navigation/toc';

export const metadata: Metadata = {
  metadataBase: new URL('https://downshift-ai.vercel.app/docs'),
  title: {
    default: 'Downshift Docs',
    template: '%s | Downshift Docs',
  },
  description: 'Documentation for Downshift: model routing, compactor, and DCI for Claude Code.',
};

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 px-8 py-12 max-w-3xl mx-auto">
          {children}
        </main>
        <TableOfContents />
      </body>
    </html>
  );
}
```

### apps/docs/app/[[...slug]]/page.tsx

```tsx
import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocs } from '@/lib/docs';

interface Props {
  params: { slug?: string[] };
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split('/'),
  }));
}

export async function generateMetadata({ params }: Props) {
  const slug = params.slug?.join('/') || 'index';
  const doc = await getDocBySlug(slug);
  if (!doc) return {};

  return {
    title: doc.meta.title,
    description: doc.meta.description,
  };
}

export default async function DocPage({ params }: Props) {
  const slug = params.slug?.join('/') || 'index';
  const doc = await getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-invert max-w-none">
      <h1>{doc.meta.title}</h1>
      {doc.content}
    </article>
  );
}
```

### apps/docs/content/docs/install.mdx

```mdx
---
title: Installation
description: Install Downshift in one command
---

# Installation

Downshift is a single Go binary with no daemon. The installer downloads
the latest release and runs `downshift setup`, which shows a diff before
writing anything.

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift/main/install.sh | sh
```

## Manual Install

1. Download the latest release from [GitHub Releases](https://github.com/tiagovilasboas/downshift/releases)
2. Extract and move to your PATH
3. Run `downshift setup --dry-run` to preview changes
4. Run `downshift setup --yes` to apply

## Verify Installation

```bash
downshift version
```

## Uninstall

```bash
downshift uninstall
```
```

---

## Estrutura de Navegação (Docs)

### apps/docs/lib/docs.ts

```ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';

const DOCS_DIR = path.join(process.cwd(), 'content/docs');
const GUIDES_DIR = path.join(process.cwd(), 'content/guides');

export interface DocMeta {
  title: string;
  description: string;
  order?: number;
}

export async function getDocBySlug(slug: string) {
  const isGuide = slug.startsWith('guides/');
  const dir = isGuide ? GUIDES_DIR : DOCS_DIR;
  const filePath = isGuide
    ? path.join(dir, slug.replace('guides/', '') + '.mdx')
    : path.join(dir, slug + '.mdx');

  try {
    const source = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(source);
    const { content: mdxContent } = await compileMDX({
      source: content,
      options: { parseFrontmatter: true },
    });

    return {
      slug,
      meta: data as DocMeta,
      content: mdxContent,
    };
  } catch {
    return null;
  }
}

export async function getAllDocs() {
  const docs = await getFilesRecursive(DOCS_DIR);
  const guides = await getFilesRecursive(GUIDES_DIR);

  return [
    ...docs.map((f) => ({ slug: f.replace('.mdx', '') })),
    ...guides.map((f) => ({ slug: 'guides/' + f.replace('.mdx', '') })),
  ];
}
```

### Sidebar Navigation Config

```ts
// apps/docs/lib/navigation.ts
export const docsNavigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Installation', href: '/docs/install' },
      { title: 'Quick Start', href: '/docs/quickstart' },
      { title: 'Configuration', href: '/docs/config' },
    ],
  },
  {
    title: 'Features',
    items: [
      { title: 'Model Routing', href: '/docs/routing' },
      { title: 'Compactor', href: '/docs/compactor' },
      { title: 'DCI', href: '/docs/dci' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { title: 'Architecture', href: '/docs/architecture' },
      { title: 'Evidence', href: '/docs/evidence' },
      { title: 'Capability Matrix', href: '/docs/capability-matrix' },
      { title: 'Harness Matrix', href: '/docs/harness-matrix' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Token Optimization', href: '/docs/guides/claude-code-token-optimization' },
      { title: 'Model Routing', href: '/docs/guides/claude-code-model-routing' },
      { title: 'Context Packing', href: '/docs/guides/claude-code-context-packing' },
      { title: 'Usage Limits', href: '/docs/guides/claude-code-usage-limit' },
    ],
  },
];
```

---

## SEO por App

### Site: Marketing SEO

```tsx
// apps/site/components/structured-data.tsx
export function StructuredData() {
  const softwareApp = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Downshift",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "macOS, Linux, Windows",
    "license": "https://www.apache.org/licenses/LICENSE-2.0",
    "url": "https://downshift-ai.vercel.app",
    "downloadUrl": "https://github.com/tiagovilasboas/downshift/releases",
    "codeRepository": "https://github.com/tiagovilasboas/downshift",
    "author": {
      "@type": "Person",
      "name": "Tiago Vilas Boas",
      "url": "https://github.com/tiagovilasboas"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      // FAQ items from current page
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [softwareApp, faqPage] })
      }}
    />
  );
}
```

### Docs: Technical SEO

```tsx
// apps/docs/app/sitemap.ts
import { getAllDocs } from '@/lib/docs';

export default async function sitemap() {
  const docs = await getAllDocs();
  const baseUrl = 'https://downshift-ai.vercel.app/docs';

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    ...docs.map((doc) => ({
      url: `${baseUrl}/${doc.slug}`,
      lastModified: new Date(),
      priority: doc.slug.startsWith('guides/') ? 0.8 : 0.9,
    })),
  ];
}
```

---

## Migração do Conteúdo Existente

### Docs a migrar (de /docs/*.html)

| Arquivo atual | MDX destino |
|---------------|-------------|
| docs/install.html | content/docs/install.mdx |
| docs/architecture.html | content/docs/architecture.mdx |
| docs/config.html | content/docs/config.mdx |
| docs/evidence.html | content/docs/evidence.mdx |
| docs/capability-matrix.html | content/docs/capability-matrix.mdx |
| docs/harness-matrix.html | content/docs/harness-matrix.mdx |
| docs/session-models.html | content/docs/session-models.mdx |
| docs/subagents.html | content/docs/subagents.mdx |
| docs/simulation.html | content/docs/simulation.mdx |
| docs/companions.html | content/docs/companions.mdx |
| docs/report.html | content/docs/report.mdx |

### Guides a migrar (de /guides/*.html)

| Arquivo atual | MDX destino |
|---------------|-------------|
| guides/claude-code-token-usage.html | content/guides/claude-code-token-usage.mdx |
| guides/claude-code-usage-limit.html | content/guides/claude-code-usage-limit.mdx |
| guides/claude-code-model-routing.html | content/guides/claude-code-model-routing.mdx |
| guides/claude-code-token-optimization.html | content/guides/claude-code-token-optimization.mdx |
| guides/claude-code-context-packing.html | content/guides/claude-code-context-packing.mdx |
| guides/claude-code-subagent-models.html | content/guides/claude-code-subagent-models.mdx |
| guides/claude-code-prompt-cache.html | content/guides/claude-code-prompt-cache.mdx |
| guides/claude-code-pretooluse-hook-subagent-model.html | content/guides/claude-code-pretooluse-hook-subagent-model.mdx |
| guides/claude-code-router-vs-downshift.html | content/guides/claude-code-router-vs-downshift.mdx |

---

## Plano de Migração Atualizado

### Fase 1: Setup Monorepo (2h)
- [ ] Inicializar Turborepo
- [ ] Criar estrutura de pastas
- [ ] Setup pnpm workspace
- [ ] Configurar turbo.json

### Fase 2: Package UI (2h)
- [ ] Extrair componentes shadcn/ui para packages/ui
- [ ] Configurar preset Tailwind em packages/config
- [ ] Setup TypeScript base config
- [ ] Testar exports

### Fase 3: App Site (4h)
- [ ] Setup Next.js 15 em apps/site
- [ ] Migrar Hero section com Motion
- [ ] Migrar Features, Problem, Evidence
- [ ] Migrar Install, FAQ
- [ ] Setup i18n (PT-BR)
- [ ] Routing visualization (SVG interativo)

### Fase 4: App Docs (3h)
- [ ] Setup Next.js 15 em apps/docs com MDX
- [ ] Criar componentes de navegação (Sidebar, TOC)
- [ ] Migrar todas as docs de HTML para MDX
- [ ] Migrar todas as guides de HTML para MDX
- [ ] Setup syntax highlighting

### Fase 5: ds-chat Component (2h)
- [ ] Migrar de vanilla JS para React em packages/ds-chat
- [ ] Integrar em apps/site
- [ ] Preservar toda lógica de cenários

### Fase 6: SEO e Meta (1h)
- [ ] Metadata API em ambas as apps
- [ ] Structured data (site)
- [ ] Sitemaps separados
- [ ] OG images

### Fase 7: Deploy (1h)
- [ ] Configurar vercel.json para multi-project
- [ ] Testar rewrites
- [ ] Verificar CSP headers
- [ ] Deploy preview

### Fase 8: Testes (2h)
- [ ] Lighthouse > 95 em ambas as apps
- [ ] Testar dark/light mode
- [ ] Testar responsive
- [ ] Testar i18n
- [ ] Verificar links internos

**Total estimado: ~17h**

---

## Vantagens desta Arquitetura

1. **Separação de concerns**
   - Site: foco em conversão, design, animações
   - Docs: foco em conteúdo técnico, MDX, navegação

2. **Deploy independente**
   - Mudança em docs não rebuilda site
   - Turborepo cacheia builds

3. **Compartilhamento eficiente**
   - UI components reutilizados
   - Tokens de design centralizados
   - TypeScript configs compartilhados

4. **Escalabilidade**
   - Fácil adicionar apps (blog, playground, etc.)
   - Cada app pode ter seu próprio i18n setup
   - Docs podem crescer sem impactar performance do site

5. **DX**
   - `pnpm dev` roda ambas as apps
   - Hot reload funciona em packages compartilhados
   - Type safety cross-package

---

## Métricas de Sucesso

| Métrica | Site | Docs |
|---------|------|------|
| Lighthouse Performance | 95+ | 95+ |
| Lighthouse SEO | 100 | 100 |
| Lighthouse Accessibility | 100 | 100 |
| First Contentful Paint | <1s | <0.8s |
| Largest Contentful Paint | <2s | <1.5s |
| Time to Interactive | <2s | <1.5s |

---

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| Complexidade do monorepo | Médio | Turborepo simplifica; pnpm resolve deps |
| CSP com duas apps | Alto | vercel.json unificado, script de hashes |
| MDX build lento | Baixo | Turborepo cache, RSC streaming |
| Routing conflicts | Médio | basePath no docs, rewrites claros |

---

**Autor:** Tiago Vilas Boas
**Última atualização:** 2026-10-22
