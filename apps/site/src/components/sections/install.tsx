import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@downshift/ui/card';
import { CopyButton } from '@downshift/ui/copy-button';

const GH = 'https://github.com/tiagovilasboas/downshift';

const steps: { cmd: string; desc: React.ReactNode }[] = [
  {
    cmd: 'curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift/main/install.sh | sh',
    desc: 'Download the binary for your platform.',
  },
  {
    cmd: 'downshift setup --dry-run',
    desc: 'Print the diff. Writes nothing.',
  },
  {
    cmd: 'downshift setup --yes',
    desc: (
      <>
        Write the hooks, with a backup. (Run{' '}
        <code className="font-mono text-foreground">downshift setup</code> to be asked first.)
      </>
    ),
  },
  {
    cmd: 'downshift doctor',
    desc: 'Check the binary, the hooks, state and scores.',
  },
  {
    cmd: 'downshift try "rename the userId variable"',
    desc: 'See the tier it would pick, and why.',
  },
  {
    cmd: 'downshift setup --undo',
    desc: 'Restore the latest backup.',
  },
];

export function Install() {
  return (
    <section id="start" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          title="Install, preview, then write."
          intro="Setup shows the diff for every harness it finds before it writes anything, saves a timestamped backup, and --undo restores it."
        />

        <ol className="mx-auto flex max-w-3xl flex-col gap-4">
          {steps.map((step, i) => (
            <li key={step.cmd}>
              <Card className="p-4">
                <div className="flex items-center justify-between gap-3 rounded-lg bg-background px-4 py-3">
                  <code className="overflow-x-auto whitespace-nowrap font-mono text-sm text-title">
                    <span className="mr-2 select-none text-muted">{i + 1}</span>
                    {step.cmd}
                  </code>
                  <CopyButton text={step.cmd} className="shrink-0">
                    Copy
                  </CopyButton>
                </div>
                <p className="mt-2 px-1 text-sm text-muted">{step.desc}</p>
              </Card>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-muted">
          Binaries for macOS and Linux (amd64, arm64) and Windows (amd64). On Claude Code, setup also sets the main session to opusplan and plan mode, unless you pass{' '}
          <code className="font-mono text-foreground">--no-session-policy</code>. It shows a diff first.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`${GH}/blob/main/docs/guides/install.md`}
            rel="noopener"
            className="inline-flex h-11 items-center gap-1 rounded-full bg-primary-bg px-6 text-sm font-medium text-primary-fg transition-opacity hover:opacity-90"
          >
            Install guide
            <span aria-hidden="true">→</span>
          </a>
          <a
            href={`${GH}/releases`}
            rel="noopener"
            className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-muted"
          >
            Releases
          </a>
        </div>
      </div>
    </section>
  );
}
