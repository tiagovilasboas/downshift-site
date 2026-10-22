export interface NavItem {
  slug: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

function docItem(slug: string): NavItem {
  return { slug, href: `/docs/${slug}` };
}

function guideItem(slug: string): NavItem {
  return { slug, href: `/guides/${slug}` };
}

export const GUIDE_SLUGS = [
  'claude-code-token-usage',
  'claude-code-usage-limit',
  'claude-code-model-routing',
  'claude-code-token-optimization',
  'claude-code-context-packing',
  'claude-code-subagent-models',
  'claude-code-prompt-cache',
  'claude-code-pretooluse-hook-subagent-model',
  'claude-code-router-vs-downshift',
] as const;

export const NAV: NavGroup[] = [
  {
    label: 'Getting Started',
    items: [docItem('install'), docItem('config')],
  },
  {
    label: 'Features',
    items: [
      docItem('architecture'),
      docItem('subagents'),
      docItem('dci-mvp-v01'),
      docItem('session-models'),
    ],
  },
  {
    label: 'Reference',
    items: [
      docItem('evidence'),
      docItem('capability-matrix'),
      docItem('harness-matrix'),
      docItem('simulation'),
      docItem('companions'),
      docItem('report'),
    ],
  },
  {
    label: 'Guides',
    items: GUIDE_SLUGS.map(guideItem),
  },
];
