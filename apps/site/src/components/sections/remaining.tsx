import Link from 'next/link';

export function SectionWho() {
  return (
    <section id="who">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">Who it is for</h2>
          <p className="bd">Downshift acts when your agent delegates a task. What you gain depends on how you pay.</p>
        </div>
        <ul className="v3 wh" aria-label="Who it is for">
          <li>
            <h3>Your agent delegates</h3>
            <p>With Claude Code, each subagent can get a model sized for the job; Codex and Cursor are functional; OpenCode is beta. No subagents, nothing to switch.</p>
          </li>
          <li>
            <h3>You pay per token</h3>
            <p><code>downshift report</code> shows tokens per completed task, routed against control.</p>
          </li>
          <li>
            <h3>You are on a plan (Pro, Max, Team)</h3>
            <p>There is no per-token bill. Downshift shows how many tokens ran on a smaller model. What that does to your plan limit is still being measured.</p>
          </li>
        </ul>
        <p className="nt2">Not for: picking your main model, or deciding whether to delegate.</p>
      </div>
    </section>
  );
}

export function Install() {
  return (
    <section id="start">
      <div className="w big">
        <div className="hd">
          <h2 className="h2x">Get started in one command.</h2>
          <p className="bd">One Go binary, no daemon. Setup shows a diff of every change before writing it.</p>
        </div>
        <ol className="ics">
          <li>
            <h3 className="h3s">Download and install</h3>
            <div className="cmd">
              <code>curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift/main/install.sh | sh</code>
              <button type="button" data-copy="install-cmd" data-done="Copied" data-fail="Copy failed">Copy</button>
            </div>
            <p className="sm">Installs the binary. Nothing is configured yet.</p>
          </li>
          <li>
            <h3 className="h3s">Preview the changes</h3>
            <div className="cmd">
              <code>downshift setup --dry-run</code>
              <button type="button" data-copy="dry-run-cmd" data-done="Copied" data-fail="Copy failed">Copy</button>
            </div>
            <p className="sm">Shows a diff of what will be written. No file is changed.</p>
          </li>
          <li>
            <h3 className="h3s">Apply</h3>
            <div className="cmd">
              <code>downshift setup --yes</code>
              <button type="button" data-copy="setup-cmd" data-done="Copied" data-fail="Copy failed">Copy</button>
            </div>
            <p className="sm">Merges the hooks into your harness config and saves a timestamped backup.</p>
          </li>
        </ol>
        <div className="cta">
          <Link className="btn" href="/docs/install">
            Full install docs
          </Link>
          <a className="btn" href="https://github.com/tiagovilasboas/downshift" rel="noopener noreferrer">
            View on GitHub
          </a>
        </div>
        <div className="sp">
          <h4>Undo at any time</h4>
          <p><code>downshift setup --undo</code> restores your harness config from the backup.</p>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const items = [
    {
      q: 'Is Compactor the same as /compact?',
      a: 'No. /compact summarises your conversation. Compactor shortens the clean output of commands such as go test and git status, keeps the exit code, and leaves errors and failures exactly as they were.',
    },
    {
      q: 'Does it save my plan limit?',
      a: 'We do not know yet. Downshift shows how many tokens ran on a smaller model; the effect on a plan limit is still being measured.',
    },
    {
      q: 'What is sent anywhere?',
      a: 'Downshift stores no prompts or task text, only counts, hashes and timings, locally. Routing makes no network call. Your harness still sends the subagent\'s work to your model provider, as before. A detached refresh of public model scores sends no prompt and can be turned off with DOWNSHIFT_SCORES=off.',
    },
    {
      q: 'Will it route to the wrong model?',
      a: 'It rewrites only when it is confident and no guardrail objects; in doubt your model stays, and complex tasks or tasks touching auth, payments or secrets never go down. Run downshift session --why to see any decision, and report a misroute as an issue.',
    },
    {
      q: 'How do I undo it?',
      a: 'downshift setup --undo restores the latest backup of your harness config. Pause one session with downshift session --pause, or stop all rewriting with DOWNSHIFT_NO_ROUTE=1.',
    },
    {
      q: 'Which coding agents does it support?',
      a: 'Claude Code is completed. Codex and Cursor are functional, OpenCode is beta, Antigravity is experimental, KiroCrew is functional. The table above shows what was observed for each.',
    },
    {
      q: 'Is DCI safe to turn on?',
      a: 'It is opt-in and off until you enable it. We measured its size and speed, not whether answers improve, so try it on a branch and compare.',
    },
    {
      q: 'Does it call an AI to pick a model? Do I need another key?',
      a: 'No to both. Routing is local, from scored signals and a model catalog, with no extra model call and no key.',
    },
    {
      q: 'How much does it save?',
      a: 'In real use with routing and compactor combined, about 53% fewer tokens per completed task (KiroCrew harness, 2026-10-21, 6 control tasks — directional, not definitive). Routing alone: about 24% fewer tokens per accepted run in a four-arm Claude Code trial (46 runs, one operator, 2026-10-21; 16% per run, interval +2.1% to +46.7%). Compactor savings are on top of routing. Estimates are not invoices.',
    },
    {
      q: 'Is Downshift related to the React downshift library?',
      a: 'No. The React downshift library builds accessible autocomplete and dropdown components. This project is an unrelated Go tool that routes AI coding agent subagents to right-sized models.',
    },
    {
      q: 'Is it free?',
      a: 'Yes. Apache-2.0, a single Go binary, no daemon.',
    },
    {
      q: 'What changes on my machine?',
      a: "Setup merges hooks into your harness config files, such as Claude Code's settings.json, and saves a timestamped backup first. A project can add an optional .downshift/policy.json tier floor. Nothing runs as a daemon.",
    },
    {
      q: 'Does it slow down a subagent spawn?',
      a: 'It adds one local process call, with no network and no LLM. In one traced run the binary exited in 30 ms. The hard limits are 2 s to read the payload and 1.5 s of hook budget, and an overrun or error leaves the spawn unchanged.',
    },
    {
      q: 'Where is the dashboard?',
      a: 'The web dashboard was removed on 2026-10-20. Use downshift report, downshift stats and downshift session, which show tokens and coverage in the terminal.',
    },
  ];

  return (
    <section id="faq">
      <div className="w">
        <div className="fq hd">
          <h2 className="h2x">Frequently asked questions</h2>
        </div>
        <div className="fql">
          {items.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// Placeholder stubs for sections implemented in M3
export function SectionAction() {
  return <section id="action" className="ns" />;
}
export function SectionCompact() {
  return <section id="compact" className="ns" />;
}
export function SectionDCI() {
  return <section id="dci" className="ns" />;
}
export function SectionFlow() {
  return <section id="flow" className="ns" />;
}
export function SectionLayers() {
  return <section id="layers" className="ns" />;
}
export function SectionEvidence() {
  return <section id="evidence" className="ns" />;
}
export function SectionHarnesses() {
  return <section id="harnesses" className="ns" />;
}
export function SectionOpen() {
  return <section id="open" className="ns" />;
}
