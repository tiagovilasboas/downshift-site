import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Transpile workspace packages
  transpilePackages: ['@downshift/ui'],
  experimental: {
    // Optimise packages
    optimizePackageImports: ['motion', '@downshift/ui'],
  },
};

export default withNextIntl(nextConfig);
