import type { Config } from 'tailwindcss';
import { downshiftPreset } from '@downshift/config/tailwind';
import typographyPlugin from '@tailwindcss/typography';

const config: Config = {
  presets: [downshiftPreset as Config],
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--f)',
            '--tw-prose-headings': 'var(--t)',
            '--tw-prose-links': 'var(--a)',
            '--tw-prose-bold': 'var(--t)',
            '--tw-prose-counters': 'var(--m)',
            '--tw-prose-bullets': 'var(--m)',
            '--tw-prose-hr': 'var(--l)',
            '--tw-prose-quotes': 'var(--f)',
            '--tw-prose-quote-borders': 'var(--l)',
            '--tw-prose-captions': 'var(--m)',
            '--tw-prose-code': 'var(--t)',
            '--tw-prose-pre-code': 'var(--f)',
            '--tw-prose-pre-bg': 'var(--c)',
            '--tw-prose-th-borders': 'var(--l)',
            '--tw-prose-td-borders': 'var(--l)',
          },
        },
      },
    },
  },
  plugins: [typographyPlugin],
};

export default config;
