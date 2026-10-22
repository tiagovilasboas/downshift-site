import type { Config } from 'tailwindcss';
import { downshiftPreset } from '@downshift/config/tailwind';

const config: Config = {
  presets: [downshiftPreset as Config],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

export default config;
