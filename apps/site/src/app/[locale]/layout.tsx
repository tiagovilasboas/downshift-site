import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@downshift/ui/globals.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://downshift-ai.vercel.app'),
  title: {
    default: 'Downshift: Claude Code routing, Compactor and DCI',
    template: '%s | Downshift',
  },
  description:
    'Free, local tool for Claude Code. Right model per subagent, shorter clean output, only the code a change touches. No extra AI.',
  keywords: [
    'Claude Code',
    'AI coding agent',
    'token optimization',
    'model routing',
    'subagent',
    'LLM cost reduction',
    'Go binary',
  ],
  authors: [{ name: 'Tiago Vilas Boas' }],
  creator: 'Tiago Vilas Boas',
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
      en: '/',
      'pt-BR': '/pt-br',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['pt_BR'],
    url: 'https://downshift-ai.vercel.app',
    siteName: 'Downshift',
    title: 'Downshift: Claude Code routing, Compactor and DCI',
    description:
      'Free, local tool for Claude Code. Right model per subagent, shorter clean output, only the code a change touches.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Downshift: Fewer tokens, same agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Downshift: Claude Code routing, Compactor and DCI',
    description:
      'Free, local tool for Claude Code. Right model per subagent, shorter clean output.',
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
        <link
          rel="preload"
          href="/fonts/Geist-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMono-Variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
