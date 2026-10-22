import { Header } from './navigation/header';
import { Sidebar, type SidebarGroup } from './navigation/sidebar';

export function DocsShell({
  groups,
  children,
}: {
  groups: SidebarGroup[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Mobile: collapsible sidebar */}
        <details className="my-4 rounded-lg border border-border bg-card p-4 md:hidden">
          <summary className="cursor-pointer text-sm font-medium text-title">
            Documentation menu
          </summary>
          <div className="mt-4">
            <Sidebar groups={groups} />
          </div>
        </details>

        <div className="md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-10 lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-[88px] max-h-[calc(100vh-112px)] overflow-y-auto pb-8 pt-8">
              <Sidebar groups={groups} />
            </div>
          </aside>
          <main className="min-w-0 pb-24 pt-4 md:pt-8">{children}</main>
        </div>
      </div>
    </>
  );
}

export default DocsShell;
