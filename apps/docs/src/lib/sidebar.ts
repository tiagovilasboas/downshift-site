import { NAV } from './nav';
import { getDoc, type Collection } from './content';
import type { SidebarGroup } from '@/components/navigation/sidebar';

function collectionFromHref(href: string): Collection {
  return href.startsWith('/guides/') ? 'guides' : 'docs';
}

/** Resolve the static NAV into sidebar groups with titles read from frontmatter. */
export function buildSidebarGroups(): SidebarGroup[] {
  return NAV.map((group) => ({
    label: group.label,
    items: group.items.map((item) => {
      const collection = collectionFromHref(item.href);
      const doc = getDoc(collection, item.slug);
      return { title: doc?.title ?? item.slug, href: item.href };
    }),
  }));
}
