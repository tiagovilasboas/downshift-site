import type { MetadataRoute } from 'next';

const BASE = 'https://downshift-ai.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: BASE,
          'pt-BR': `${BASE}/pt-br`,
        },
      },
    },
    {
      url: `${BASE}/pt-br`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
