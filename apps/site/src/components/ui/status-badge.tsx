// Status pill replicating index.html `.stt` with dot variants.
// level: 'done' (green dot .k), 'optin' (hint dot .h), 'experimental' (.e), 'none' (no colored dot)
type Level = 'done' | 'optin' | 'experimental' | 'none';

const dotClass: Record<Level, string> = {
  done: 'bg-accent',
  optin: 'bg-hint',
  experimental: 'bg-[#f59e0b]',
  none: 'bg-muted',
};

export function StatusBadge({
  level,
  children,
}: {
  level: Level;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted">
      <span className={`h-1.5 w-1.5 rounded-full ${dotClass[level]}`} aria-hidden="true" />
      {children}
    </span>
  );
}
