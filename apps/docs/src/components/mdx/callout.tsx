import * as React from 'react';

type CalloutType = 'info' | 'warning' | 'tip' | 'danger';

const STYLES: Record<
  CalloutType,
  { border: string; icon: string; label: string }
> = {
  info: { border: 'var(--a)', icon: 'ℹ', label: 'Note' },
  warning: { border: '#f59e0b', icon: '⚠', label: 'Warning' },
  tip: { border: '#22c55e', icon: '✓', label: 'Tip' },
  danger: { border: '#ef4444', icon: '✕', label: 'Danger' },
};

export interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = STYLES[type];
  return (
    <div
      role="note"
      className="my-6 rounded-r-lg rounded-l-sm border border-border bg-card px-5 py-4"
      style={{ borderLeft: `3px solid ${style.border}` }}
    >
      <p
        className="mb-1 flex items-center gap-2 text-sm font-medium"
        style={{ color: style.border }}
      >
        <span aria-hidden="true">{style.icon}</span>
        <span>{title ?? style.label}</span>
      </p>
      <div className="text-sm text-foreground [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

export default Callout;
