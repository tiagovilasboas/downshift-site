import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'pt-BR' }];
}

export const metadata: Metadata = {
  metadataBase: new URL('https://downshift-ai.vercel.app'),
  title: {
    default: 'Downshift: Claude Code routing, Compactor and DCI',
    template: '%s | Downshift',
  },
  description:
    'Free, local tool for Claude Code and other coding agents. Right model per subagent, shorter clean output, only the code a change touches. No extra AI.',
  keywords: ['Claude Code', 'AI coding agent', 'token optimization', 'model routing', 'subagent', 'LLM cost reduction'],
  authors: [{ name: 'Tiago Vilas Boas' }],
  creator: 'Tiago Vilas Boas',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: '/', languages: { en: '/', 'pt-BR': '/pt-br' } },
  openGraph: {
    type: 'website', locale: 'en_US', alternateLocale: ['pt_BR'],
    url: 'https://downshift-ai.vercel.app', siteName: 'Downshift',
    title: 'Downshift: Claude Code routing, Compactor and DCI',
    description: 'Free, local tool for Claude Code. Right model per subagent, shorter clean output, only the code a change touches.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Downshift: Fewer tokens, same agent' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Downshift: Claude Code routing, Compactor and DCI',
    description: 'Free, local tool for Claude Code. Right model per subagent, shorter clean output.',
    images: ['/og.png'],
  },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/Geist-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMono-Variable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body>
        {/* SVG sprite — icon system used throughout the site */}
        <svg className="spr" aria-hidden="true" focusable="false">
          <defs>
            <g id="im"><path d="M4 8h16M4 16h16"/></g>
            <g id="is"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></g>
            <g id="ic"><path d="m9 5 7 7-7 7"/></g>
            <g id="ik"><path d="m5 12.5 4.5 4.5L19 7.5"/></g>
            <g id="ia"><path d="M7 17 17 7M9 7h8v8"/></g>
            <g id="io"><path d="m8 7-5 5 5 5M16 7l5 5-5 5"/></g>
            <g id="ih"><path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6z"/><path d="m9 12 2 2 4-4"/></g>
            <g id="ie"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/></g>
            <g id="id"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 20h16"/></g>
            <g id="iu"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6M16 4.5a3.5 3.5 0 0 1 0 7M18 14.3c2 .7 3.5 2.5 3.5 5.7"/></g>
          </defs>
        </svg>

        <a className="skip" href="#main">Skip to content</a>

        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>

        <Analytics />
        <SpeedInsights />
        {/* Routing visualization animation script — controls figure#dsc */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/components/dsc-anim.js" defer></script>
      </body>
    </html>
  );
}
