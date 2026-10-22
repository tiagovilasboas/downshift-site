import { StatusBadge } from '@/components/ui/status-badge';
import { Card } from '@downshift/ui/card';

type Level = 'done' | 'optin';

const primary: {
  n: string;
  title: React.ReactNode;
  level: Level;
  status: string;
  value: React.ReactNode;
  qualifier: React.ReactNode;
}[] = [
  {
    n: '1',
    title: 'Right model per subagent',
    level: 'done',
    status: 'Completed on Claude Code',
    value: "Rewrites only the subagent's model, never your main session.",
    qualifier:
      'About 53% fewer tokens per completed task in real use, routing and compactor combined (KiroCrew, 2026-10-21, 6 control tasks — directional).',
  },
  {
    n: '2',
    title: 'Compactor',
    level: 'done',
    status: 'On by default',
    value: (
      <>
        Wraps <code className="font-mono text-foreground">git</code>,{' '}
        <code className="font-mono text-foreground">go test</code> and the other test and build tools listed in the docs; keeps the exit code.
      </>
    ),
    qualifier: (
      <>
        Only a plain allowlisted command is rewritten; of the git commands, only{' '}
        <code className="font-mono text-foreground">git status</code> shrinks, the rest pass through unchanged; automatic rewrite is Claude Code only.
      </>
    ),
  },
  {
    n: '3',
    title: 'Code intelligence, DCI',
    level: 'optin',
    status: 'Opt-in',
    value: 'Gives the agent only the code a change touches.',
    qualifier: 'Bytes and latency measured; answer quality not measured.',
  },
];

const secondary: {
  title: string;
  level?: Level;
  statusLabel?: string;
  value: React.ReactNode;
  qualifier: React.ReactNode;
}[] = [
  {
    title: 'Several harnesses, honest levels',
    value: 'One install sets up Claude Code, Codex and Cursor hooks; OpenCode is beta.',
    qualifier: 'Codex and Cursor are functional, OpenCode is beta.',
  },
  {
    title: 'Guardrails',
    level: 'done',
    statusLabel: 'Implemented',
    value: 'Auth, payments, crypto and private data are never downshifted.',
    qualifier: 'Detection is pattern based, English and Portuguese; false-positive rate on real traffic is not measured.',
  },
  {
    title: 'See and compare',
    level: 'done',
    statusLabel: 'Implemented',
    value: 'Switched, held or only observed, with the reason, plus routed against control.',
    qualifier: 'Child token usage is observed on Claude Code only; the report needs 20 completed tasks per group.',
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <p className="mx-auto mb-10 max-w-3xl text-center text-sm text-muted">
          Completed: seen working end to end. Implemented: code, tests and at least one real observation. Opt-in: off until you turn it on. Reports show tokens and coverage, not dollars.
        </p>

        <ol className="grid gap-6 lg:grid-cols-3">
          {primary.map((f) => (
            <li key={f.n}>
              <Card className="flex h-full flex-col p-6">
                <span className="font-mono text-sm text-muted">{f.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-title">{f.title}</h3>
                <p className="mt-2">
                  <StatusBadge level={f.level}>{f.status}</StatusBadge>
                </p>
                <p className="mt-4 text-foreground">{f.value}</p>
                <p className="mt-4 text-sm text-muted">
                  <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-hint">Qualifier</span>
                  {f.qualifier}
                </p>
              </Card>
            </li>
          ))}
        </ol>

        <ol className="mt-6 grid gap-6 lg:grid-cols-3">
          {secondary.map((f) => (
            <li key={f.title}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-title">{f.title}</h3>
                  {f.level && f.statusLabel ? (
                    <StatusBadge level={f.level}>{f.statusLabel}</StatusBadge>
                  ) : null}
                </div>
                <p className="mt-4 text-foreground">{f.value}</p>
                <p className="mt-4 text-sm text-muted">
                  <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-hint">Qualifier</span>
                  {f.qualifier}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
