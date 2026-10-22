# Spike: Migração para Next.js + Tailwind + Motion + shadcn/ui

**Data:** 2026-10-22
**Objetivo:** Migrar o downshift-site de HTML estático para Next.js 15, mantendo 100% do layout atual, adicionando SEO agressivo, branding profissional e fundação para marketing.

---

## Stack Final

| Camada | Escolha | Justificativa |
|--------|---------|---------------|
| Framework | Next.js 15 (App Router) | SSG/ISR, metadata API, best-in-class SEO |
| Styling | Tailwind CSS v4 + CSS custom properties | Mantém design system atual, tokens nativos |
| Components | shadcn/ui | Acessível, unstyled, composable |
| Motion | Motion (ex-Framer Motion) | Animações declarativas, AI Kit integrado |
| Fonts | Geist (já em uso) | Mantém identidade visual |
| i18n | next-intl | PT-BR/EN com routing nativo |
| Analytics | Vercel Analytics + Speed Insights | Zero-config, privacy-first |
| Deployment | Vercel | Já configurado, edge network |

---

## SEO Agressivo — Estratégia Completa

### 1. Technical SEO (Next.js nativo)

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://downshift-ai.vercel.app'),
  title: {
    default: 'Downshift: Claude Code routing, Compactor and DCI',
    template: '%s | Downshift'
  },
  description: 'Free, local tool for Claude Code. Right model per subagent, shorter clean output, only the code a change touches. No extra AI.',
  keywords: ['Claude Code', 'AI coding agent', 'token optimization', 'model routing', 'subagent', 'LLM cost reduction'],
  authors: [{ name: 'Tiago Vilas Boas' }],
  creator: 'Tiago Vilas Boas',
  publisher: 'Montanha Tech',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'pt-BR': '/pt-br',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    url: 'https://downshift-ai.vercel.app',
    siteName: 'Downshift',
    title: 'Downshift: Claude Code routing, Compactor and DCI',
    description: 'Free, local tool for Claude Code. Right model per subagent, shorter clean output, only the code a change touches.',
    images: [{
      url: '/og.png',
      width: 1200,
      height: 630,
      alt: 'Downshift: Fewer tokens, same agent',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Downshift: Claude Code routing, Compactor and DCI',
    description: 'Free, local tool for Claude Code. Right model per subagent, shorter clean output.',
    images: ['/og.png'],
  },
  verification: {
    google: 'GOOGLE_SITE_VERIFICATION', // Adicionar após setup
  },
};
```

### 2. Structured Data (JSON-LD expandido)

```tsx
// components/structured-data.tsx
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
    "publisher": {
      "@type": "Organization",
      "name": "Montanha Tech",
      "taxID": "60.782.110/0001-84"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": { // Quando houver reviews
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1" // Atualizar conforme crescer
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://downshift-ai.vercel.app" },
      { "@type": "ListItem", "position": 2, "name": "Docs", "item": "https://downshift-ai.vercel.app/docs" },
      { "@type": "ListItem", "position": 3, "name": "Guides", "item": "https://downshift-ai.vercel.app/guides" }
    ]
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Install Downshift",
    "description": "Install Downshift in one command to optimize your Claude Code token usage",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Download",
        "text": "Run: curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift/main/install.sh | sh"
      },
      {
        "@type": "HowToStep",
        "name": "Preview",
        "text": "Run: downshift setup --dry-run"
      },
      {
        "@type": "HowToStep",
        "name": "Install",
        "text": "Run: downshift setup --yes"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [softwareApp, breadcrumb, howTo]
        })
      }}
    />
  );
}
```

### 3. Sitemap Dinâmico

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://downshift-ai.vercel.app';
  const lastModified = new Date();

  // Páginas principais
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/pt-br', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/docs', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/guides', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/pt-br/guias', priority: 0.8, changeFrequency: 'weekly' },
  ];

  // Docs pages
  const docs = [
    'install', 'architecture', 'config', 'evidence',
    'capability-matrix', 'harness-matrix', 'session-models',
    'subagents', 'simulation', 'companions', 'report'
  ];

  // Guides pages
  const guides = [
    'claude-code-token-usage', 'claude-code-usage-limit',
    'claude-code-model-routing', 'claude-code-token-optimization',
    'claude-code-context-packing', 'claude-code-subagent-models',
    'claude-code-prompt-cache', 'claude-code-pretooluse-hook-subagent-model',
    'claude-code-router-vs-downshift'
  ];

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: changeFrequency as 'weekly',
      priority,
    })),
    ...docs.map(doc => ({
      url: `${baseUrl}/docs/${doc}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...guides.map(guide => ({
      url: `${baseUrl}/guides/${guide}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
```

### 4. Robots.txt Otimizado

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt', '/docs/', '/guides/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'Claude-Web',
        allow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
      },
    ],
    sitemap: 'https://downshift-ai.vercel.app/sitemap.xml',
  };
}
```

### 5. llms.txt para AI Crawlers

Já existe, manter e expandir:
```
# Downshift

> Free, local tool for Claude Code and other coding agents.

## Features
- Model routing: right model per subagent spawn
- Compactor: shorter clean output from routine commands
- DCI: only the code a change touches (opt-in)

## Install
curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift/main/install.sh | sh
downshift setup --yes

## Links
- Docs: /docs/
- GitHub: https://github.com/tiagovilasboas/downshift
- Install guide: /docs/install/
```

---

## Branding — Design System Tokens

### Manter os tokens CSS existentes (zero mudança visual)

```tsx
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
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
        'line': 'var(--li)',
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
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### Global CSS (preservar variáveis existentes)

```css
/* app/globals.css */
@import 'tailwindcss';

@layer base {
  :root {
    color-scheme: dark;
    --b: #0a0a0a;
    --c: #1a1a1a;
    --l: #1f2329;
    --l2: rgba(255, 255, 255, 0.1);
    --f: #d6dae2;
    --t: #fff;
    --m: #868a90;
    --a: #22C55E;
    --r: #22C55E;
    --h: #7d828a;
    --pb: #fff;
    --pf: #000;
    --sb: #1f1f1f;
    --sf: #fff;
    --li: #686c73;
    --ss: "Geist", "Geist Fallback", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    --mo: "Geist Mono", "Geist Mono Fallback", ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  @media (prefers-color-scheme: light) {
    :root {
      --b: #fafafa;
      --c: #fff;
      --l: #d9dde3;
      --l2: rgba(10, 10, 10, 0.12);
      --f: #1f2937;
      --t: #0a0a0a;
      --m: #4b5563;
      --a: #166534;
      --r: #0a0a0a;
      --h: #6b7280;
      --pb: #0a0a0a;
      --pf: #fff;
      --sb: #eceff3;
      --sf: #0a0a0a;
      --li: #80868f;
    }
  }
}
```

---

## Marketing — Fundação

### 1. Analytics Setup

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 2. Newsletter/Waitlist (futuro)

```tsx
// components/newsletter-form.tsx
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Integrar com Resend/ConvertKit/Buttondown
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="flex gap-2"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 px-4 py-2 rounded-full bg-secondary-bg border border-border"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2 rounded-full bg-primary-bg text-primary-fg font-medium"
      >
        {status === 'loading' ? 'Subscribing...' : 'Get updates'}
      </button>
    </motion.form>
  );
}
```

### 3. Social Proof Section (futuro)

```tsx
// components/social-proof.tsx
import { motion } from 'motion/react';

const testimonials = [
  // Coletar de GitHub stars, issues, discussions
];

const stats = [
  { value: '53%', label: 'fewer tokens per task' },
  { value: '0', label: 'extra AI calls' },
  { value: '46', label: 'runs in trial' },
];

export function SocialProof() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="grid grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-5xl font-bold text-title">{stat.value}</div>
              <div className="text-muted mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

### 4. OG Image Dinâmico

```tsx
// app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Downshift';
  const description = searchParams.get('description') || 'Fewer tokens, same agent';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#fff',
          fontFamily: 'Geist',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: 32, color: '#868a90', marginTop: 24 }}>{description}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

---

## Estrutura de Pastas

```
downshift-site/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                 # Home EN
│   │   ├── layout.tsx
│   │   └── components/
│   │       ├── hero.tsx
│   │       ├── features.tsx
│   │       ├── problem.tsx
│   │       ├── evidence.tsx
│   │       ├── install.tsx
│   │       └── faq.tsx
│   ├── pt-br/
│   │   ├── page.tsx                 # Home PT-BR
│   │   └── guias/
│   ├── docs/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── guides/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── og/route.tsx                 # OG Image API
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── nav.tsx
│   ├── marketing/
│   │   ├── ds-chat.tsx              # Migrado de vanilla JS
│   │   ├── routing-demo.tsx
│   │   ├── terminal.tsx
│   │   └── copy-button.tsx
│   └── structured-data.tsx
├── lib/
│   ├── utils.ts                     # cn(), formatters
│   └── content.ts                   # MDX loader
├── content/
│   ├── docs/                        # MDX docs
│   └── guides/                      # MDX guides
├── public/
│   ├── fonts/
│   ├── og.png
│   ├── favicon.svg
│   └── ...
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Animações com Motion

### Hero Animation

```tsx
// components/marketing/hero.tsx
'use client';

import { motion } from 'motion/react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-border bg-card text-muted text-sm"
          >
            <span className="px-2 py-0.5 rounded-full bg-secondary-bg text-title text-xs font-medium">
              Beta
            </span>
            Apache-2.0, Go
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-4xl lg:text-6xl font-semibold tracking-tight"
          >
            <span className="text-title">Your best model</span>
            <span className="block text-muted">shouldn't do every job.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg text-muted max-w-xl"
          >
            Downshift gives your coding agent the right model for each subagent,
            shorter output from clean commands, and, if you turn it on, only the
            code a change touches. No extra AI call to decide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <a href="#start" className="btn-primary">Install</a>
            <a href="/docs" className="btn-secondary">Read the docs</a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <RoutingVisualization />
        </motion.div>
      </div>
    </section>
  );
}
```

### Scroll-triggered sections

```tsx
// components/marketing/feature-card.tsx
'use client';

import { motion } from 'motion/react';

interface FeatureCardProps {
  title: string;
  description: string;
  status: 'completed' | 'implemented' | 'opt-in';
  index: number;
}

export function FeatureCard({ title, description, status, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-t border-title pt-4"
    >
      <div className="flex items-center gap-3 text-muted text-sm mb-2">
        <span className="font-mono">{title}</span>
        <StatusBadge status={status} />
      </div>
      <h3 className="text-lg font-medium text-title">{title}</h3>
      <p className="mt-2 text-foreground">{description}</p>
    </motion.div>
  );
}
```

---

## Plano de Migração

### Fase 1: Setup (2h)
- [ ] `npx create-next-app@latest downshift-next --typescript --tailwind --eslint --app`
- [ ] Instalar dependências: `motion`, `next-intl`, `@vercel/analytics`
- [ ] Configurar shadcn/ui: `npx shadcn@latest init`
- [ ] Copiar fonts e assets
- [ ] Configurar Tailwind com tokens existentes

### Fase 2: Layout e Componentes Base (3h)
- [ ] Header com nav responsivo (já existe, migrar)
- [ ] Footer (já existe, migrar)
- [ ] Componentes UI: Button, Card, Badge, Terminal
- [ ] Copy button com toast

### Fase 3: Home Page (4h)
- [ ] Hero section com animações
- [ ] Features strip (3 cards)
- [ ] Problem section
- [ ] Evidence section
- [ ] Install section
- [ ] FAQ (já existe, usar `<details>`)

### Fase 4: Visualização de Routing (2h)
- [ ] Migrar o SVG interativo `dsc` para React
- [ ] Manter a animação de replay
- [ ] Integrar com Motion

### Fase 5: ds-chat Component (2h)
- [ ] Migrar de vanilla JS para React
- [ ] Manter toda a lógica de cenários
- [ ] Adicionar tipos TypeScript

### Fase 6: Docs e Guides (2h)
- [ ] Setup MDX com `@next/mdx` ou `contentlayer`
- [ ] Migrar páginas de docs
- [ ] Migrar páginas de guides
- [ ] Index pages

### Fase 7: i18n (1h)
- [ ] Setup next-intl
- [ ] Migrar conteúdo PT-BR
- [ ] Language switcher

### Fase 8: SEO e Meta (1h)
- [ ] Metadata API em todas as páginas
- [ ] Structured data
- [ ] OG images dinâmicos
- [ ] Sitemap e robots.txt

### Fase 9: Testes e Polish (2h)
- [ ] Lighthouse score > 95 em tudo
- [ ] Testar dark/light mode
- [ ] Testar responsive
- [ ] Testar i18n
- [ ] CSP headers no vercel.json

---

## Métricas de Sucesso

| Métrica | Atual | Target |
|---------|-------|--------|
| Lighthouse Performance | ~90 | 95+ |
| Lighthouse SEO | ~95 | 100 |
| Lighthouse Accessibility | ~95 | 100 |
| First Contentful Paint | ~1.2s | <1s |
| Largest Contentful Paint | ~2.5s | <2s |
| Cumulative Layout Shift | ~0.1 | <0.05 |
| Time to Interactive | ~3s | <2s |

---

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| CSP hashes quebram com build | Alto | Script para recalcular hashes no build |
| Animações pesadas no mobile | Médio | `prefers-reduced-motion` + viewport detection |
| Bundle size aumenta | Médio | Tree-shaking, lazy loading, dynamic imports |
| SEO regression | Alto | Comparar before/after com Lighthouse CI |

---

## Próximos Passos

1. **Aprovação do spike** — revisar com o time
2. **Branch de feature** — `feature/nextjs-migration`
3. **Execução paralela** — manter HTML atual como fallback
4. **Deploy gradual** — Vercel preview para cada PR
5. **Cutover** — após todos os testes passarem

---

**Autor:** Tiago Vilas Boas
**Última atualização:** 2026-10-22
