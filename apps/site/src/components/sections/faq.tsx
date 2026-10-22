const faqs: { q: string; a: string }[] = [
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
    a: "Downshift stores no prompts or task text, only counts, hashes and timings, locally. Routing makes no network call. Your harness still sends the subagent's work to your model provider, as before. A detached refresh of public model scores sends no prompt and can be turned off with DOWNSHIFT_SCORES=off.",
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
    q: 'Where is the dashboard?',
    a: 'The web dashboard was removed on 2026-10-20. Use downshift report, downshift stats and downshift session, which show tokens and coverage in the terminal.',
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
    a: 'It adds one local process call, with no network and no LLM. In one traced run the binary exited in 30 ms. The hard limits are 2 s to read the payload and 1.5 s of hook budget, and an overrun or error leaves the spawn unchanged. On Claude Code it may also wait up to 400 ms for the parent transcript, to learn the current model. That is one trace, not a benchmark.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight text-title sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-border bg-card px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-title">
                {faq.q}
                <span className="shrink-0 text-muted transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
