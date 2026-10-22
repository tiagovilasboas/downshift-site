'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface SidebarItem {
  title: string;
  href: string;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export function Sidebar({ groups }: { groups: SidebarGroup[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="text-sm">
      {groups.map((group) => (
        <div key={group.label} className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            {group.label}
          </p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={
                      active
                        ? 'block rounded-md px-3 py-1.5 font-medium text-accent'
                        : 'block rounded-md px-3 py-1.5 text-muted hover:text-title'
                    }
                    style={
                      active
                        ? {
                            background:
                              'color-mix(in srgb, var(--a) 10%, transparent)',
                          }
                        : undefined
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export default Sidebar;
