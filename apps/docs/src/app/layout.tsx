import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import '@downshift/ui/globals.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://downshift-ai.vercel.app/docs'),
  title: {
    default: 'Downshift Docs',
    template: '%s | Downshift Docs',
  },
  description:
    'Documentation for Downshift: model routing, compactor, and DCI for Claude Code.',
};

export default function DocsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
