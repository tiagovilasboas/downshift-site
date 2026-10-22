import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'pt-BR'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
  },
  localePrefix: {
    mode: 'as-needed', // en = /, pt-BR = /pt-br
  },
  localeDetection: true,
});
