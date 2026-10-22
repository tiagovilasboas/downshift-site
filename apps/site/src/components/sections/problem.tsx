import { SectionHeading } from '@/components/ui/section-heading';
import { StatusBadge } from '@/components/ui/status-badge';
import { Card } from '@downshift/ui/card';

type Level = 'done' | 'optin';

const leaks: {
  title: string;
  problem: React.ReactNode;
  fix: React.ReactNode;
  statusLevel: Level;
  status: string;
}[] = [
  {
    title: 'Subagents inherit your most expensive model',
    problem: 'Renaming a variable gets the same model as an architecture review.',
    fix: 'A local hook scores the task and rewrites the model only when it is confident. In doubt, your model stays.',
    statusLevel: 'done',
    status: 'Completed on Claude Code',
  },
  {
    title: 'Routine output fills the context',
    problem: (
      <>
        A passing test run or a clean <code className="font-mono text-foreground">git status</code> drops dozens of repeated lines into the context.
      </>
    ),
    fix: (
      <>
        <code className="font-mono text-foreground">downshift compact</code> shortens the clean run. Errors, stack traces and failing output stay byte for byte.
      </>
    ),
    statusLevel: 'done',
    status: 'Implemented, on by default',
  },
  {
    title: 'The agent reads more code than the change needs',
    problem: 'To change one symbol it opens whole files and hunts for callers.',
    fix: 'DCI packs only the affected symbols, under a byte cap.',
    statusLevel: 'optin',
    status: 'Opt-in. Measured for latency and bytes.',
  },
];

export function Problem() {
  return (
    <section id="problem" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          title="Where a coding agent spends more than it needs to."
          intro="Three leaks. Downshift is one Go binary, no daemon, and acts on each."
        />
        <ol className="grid gap-6 lg:grid-cols-3">
          {leaks.map((leak, i) => (
            <li key={leak.title}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-sm text-muted">{i + 1}</span>
                  <h3 className="text-lg font-semibold text-title">{leak.title}</h3>
                </div>
                <p className="mt-2 text-muted">{leak.problem}</p>
                <div className="mt-5 border-t border-border pt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-hint">Fix</p>
                  <p className="mt-1 text-sm text-foreground">{leak.fix}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-hint">Status</p>
                  <p className="mt-1">
                    <StatusBadge level={leak.statusLevel}>{leak.status}</StatusBadge>
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
