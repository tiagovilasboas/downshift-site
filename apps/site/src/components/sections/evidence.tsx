import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@downshift/ui/card';

const GH = 'https://github.com/tiagovilasboas/downshift';

const headlineStats: {
  value: string;
  label: string;
  tags?: string[];
  note?: string;
}[] = [
  {
    value: '~53%',
    label: 'fewer tokens per completed task, routing and compactor, real use',
    tags: ['KiroCrew harness', '2026-10-21', '6 control tasks'],
    note: 'One session. Control group is thin; treat as directional, not definitive.',
  },
  {
    value: '~24%',
    label: 'fewer tokens per accepted run, routing only, four-arm trial',
    tags: ['Claude Code', '46 runs', 'one operator', '2026-10-21'],
    note: '16% per run; 95% interval +2.1% to +46.7%. Routing only; Compactor savings are additional. State isolation bugs found in battery — number may change.',
  },
  {
    value: '12 of 12',
    label: 'accepted in both routed arms (C and D)',
  },
  {
    value: '82.3%',
    label: 'fewer bytes on the 26 of 248 corpus files that compact',
    tags: ['synthetic fixtures', '23.7% across all 248', 'your mix will differ'],
  },
  {
    value: '1 in 10',
    label: 'spawns left unrouted as a control group (about)',
  },
];

// Tokens per accepted run, four arms (bar width relative to arm A)
const fourArms: { name: string; w: string; value: string; note: string }[] = [
  { name: 'A Opus fixed', w: '100%', value: '2.25M', note: '10 of 11 accepted' },
  { name: 'B opusplan', w: '89%', value: '2.00M', note: '10 of 11 accepted, no routing' },
  { name: 'C opusplan + routing', w: '68%', value: '1.52M', note: '12 of 12 accepted' },
  { name: 'D routing + Compactor', w: '65%', value: '1.46M', note: '12 of 12 accepted' },
];

// Arm-against-arm deltas
const deltas: { name: string; w: string; value: string; note: string; hatched?: boolean }[] = [
  { name: 'Routing (B−C)', w: '69%', value: '24.1%', note: 'interval +2.1% to +46.7%. Per run, before charging failures: 16.5%, +0.6% to +29.7%. Includes the cost of one failed run in the opusplan arm (named constants, 2 of 3 accepted).' },
  { name: 'Routing + Compactor (B−D)', w: '77%', value: '26.8%', note: 'interval +4.4% to +48.3%' },
  { name: 'Compactor alone (C−D)', w: '10%', value: '3.5%', note: 'interval −14.8% to +19.4%, includes zero: not measurable in this part. The agents chained commands with “;”, which Compactor did not wrap until PR #424 (merged 2026-10-21).', hatched: true },
  { name: 'Opus fixed against everything on (A−D)', w: '100%', value: '34.8%', note: 'interval +19.1% to +52.5%' },
  { name: 'opusplan alone (A−B)', w: '32%', value: '11.0%', note: 'interval −28.9% to +39.0%, includes zero', hatched: true },
];

const notShown = [
  'A saving on your plan limit. Still being measured.',
  'Any saving from everyday use. Two controlled runs on mechanical tasks so far; nothing attributable.',
  "Compactor's own effect on tokens in a run. Not measurable in part 1.",
  'Routing on natural fixes that run tests. That is part 2.',
  'That DCI gives better answers. We measured size and latency only.',
  'Compaction on your own commands. The 82.3% is a synthetic corpus, in bytes.',
  'That the model is honored in every harness. See the table below.',
  'A false-positive rate for risk detection on real traffic.',
];

const evidenceLinks = [
  { href: `${GH}/blob/main/docs/evidence/four-arm-mechanical-2026-10-21.md`, label: 'Read the four-arm write-up' },
  { href: `${GH}/blob/main/docs/evidence/subagent-routing-ab-2026-10-15.md`, label: 'Read the A/B report' },
  { href: `${GH}/blob/main/docs/evidence/compaction-corpus-2026-10-21.md`, label: 'See the corpus results' },
];

function BarRow({ name, w, value, note, hatched }: { name: string; w: string; value: string; note?: string; hatched?: boolean }) {
  return (
    <li className="py-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="text-foreground">{name}</span>
        <b className="font-mono text-title">{value}</b>
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary-bg">
        <span
          className={`block h-full rounded-full ${hatched ? 'bg-muted/50' : 'bg-accent'}`}
          style={{ width: w }}
        />
      </div>
      {note ? <p className="mt-1.5 text-xs text-muted">{note}</p> : null}
    </li>
  );
}

export function Evidence() {
  return (
    <section id="evidence" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading
          title="Real numbers. No marketing math."
          intro="KiroCrew real use + Claude Code four-arm trial, 2026-10-21. Two harnesses, independent evidence."
        />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {headlineStats.map((s) => (
            <li key={s.value}>
              <Card className="flex h-full flex-col p-6">
                <b className="text-3xl font-semibold text-title">{s.value}</b>
                <span className="mt-2 text-sm text-foreground">{s.label}</span>
                {s.tags ? (
                  <span className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <i key={tag} className="rounded-full bg-secondary-bg px-2 py-0.5 text-xs not-italic text-muted">
                        {tag}
                      </i>
                    ))}
                  </span>
                ) : null}
                {s.note ? <span className="mt-3 text-xs text-muted">{s.note}</span> : null}
              </Card>
            </li>
          ))}
        </ul>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-base font-semibold text-title">Tokens per accepted run, four arms</h3>
            <p className="mt-1 text-xs text-muted">2026-10-21, millions of tokens</p>
            <ul className="mt-4">
              {fourArms.map((row) => (
                <BarRow key={row.name} {...row} />
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              Tokens = input + output + cache read + cache write, all models. Bar length relative to arm A.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-base font-semibold text-title">Fewer tokens per accepted run, arm against arm</h3>
            <p className="mt-1 text-xs text-muted">bootstrap 95% intervals</p>
            <ul className="mt-4">
              {deltas.map((row) => (
                <BarRow key={row.name} {...row} />
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">
              solid: interval excludes zero. hatched: interval includes zero.
            </p>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h3 className="text-base font-semibold text-title">Earlier trial (2026-10-15, list price)</h3>
          <p className="mt-2 text-sm text-muted">
            Up to about 12% cheaper per run on the mechanical batch. One trial, one operator, three runs per cell, list price, Claude Code, 2026-10-15. 12 of 12 checks passed in both arms; checks verify structure, not quality.
          </p>
          <ul className="mt-4">
            <BarRow name="Rename" w="100%" value="~33%" note="all five subagents downshifted" />
            <BarRow name="Named constants" w="42%" value="~14%" />
            <BarRow name="Doc comments" w="30%" value="~10%" note="the interval includes zero" hatched />
            <BarRow name="Mirrored tests" w="100%" value="noise" note="nothing downshifted in 2 of 3 runs" hatched />
          </ul>
          <p className="mt-3 text-xs text-muted">List-price estimate. Bar length is relative to the largest saving.</p>
        </Card>

        <Card className="mt-6 p-6">
          <h3 className="text-base font-semibold text-title">What we have not shown</h3>
          <ul className="mt-4 grid list-disc gap-2 pl-5 text-sm text-muted sm:grid-cols-2">
            {notShown.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Card>

        <p className="mt-6 text-sm text-muted">
          Part 1 of 2: mechanical tasks. Part 2 (natural fixes that run tests) is next.
        </p>

        <p className="mt-4 flex flex-wrap gap-4 text-sm">
          {evidenceLinks.map((link) => (
            <a key={link.href} href={link.href} rel="noopener" className="inline-flex items-center gap-1 text-accent transition-opacity hover:opacity-80">
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </p>
      </div>
    </section>
  );
}
