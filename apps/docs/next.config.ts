import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';

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

const nextConfig: NextConfig = {
  // MDX pages
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  // Serve from /docs path in production (rewrites handled in root vercel.json)
  // basePath: '/docs', // uncomment when deploying via vercel rewrites
  transpilePackages: ['@downshift/ui'],
  experimental: {
    optimizePackageImports: ['@downshift/ui'],
    mdxRs: true,
  },
};

export default withMDX(nextConfig);
