const STEPS = [
  {
    n: 1, cls: 'oh', dot: 'e', label: 'Harness',
    title: 'The agent spawns a subagent', code: 'Agent / Task',
    text: 'The main agent delegates through its spawn tool: Agent or Task, spawn_agent, invoke_subagent. Downshift sees nothing until the harness fires its pre-tool hook.',
  },
  {
    n: 2, cls: 'od', dot: 'k', label: 'Downshift',
    title: 'The hook starts', code: 'runHookAdapter',
    text: 'runHookAdapter reads the payload from stdin, capped at 1 MiB with a 2 s read timeout, sets a 1.5 s budget, and turns any panic into an unchanged spawn.',
  },
  {
    n: 3, cls: 'od', dot: 'k', label: 'Downshift',
    title: 'The adapter reads the payload', code: 'internal/adapters',
    text: 'The harness adapter reads the task text, the model the child would run on and the session. It declares what the harness can do and holds no policy.',
  },
  {
    n: 4, cls: 'od', dot: 'k', label: 'Downshift',
    title: 'The task is classified', code: 'internal/classify',
    text: 'Weighted signals in English and Portuguese give TRIVIAL, SIMPLE, MEDIUM or COMPLEX, which maps to a tier: small, mid or frontier. A prompt with no signal defaults to mid and abstains.',
  },
  {
    n: 5, cls: 'od', dot: 'k', label: 'Downshift',
    title: 'The semantic step can only raise', code: 'internal/fuse',
    text: 'An in-process word-hash step may lift a hesitant class. It never lowers a tier, never boosts a prompt with no signal and never creates COMPLEX on its own.',
  },
  {
    n: 6, cls: 'od', dot: 'k', label: 'Downshift',
    title: 'Floors and guardrails check', code: 'selfcheck.go R1-R9',
    text: 'The risk floor, guardrails R1 to R9 and the project floor in .downshift/policy.json run next. The session model list and the quota gate decide what can be written. Any hit means: keep the model.',
  },
  {
    n: 7, cls: 'od', dot: 'k', label: 'Downshift',
    title: 'Rewrite or hold', code: 'updatedInput',
    text: 'If it is confident and safe, the hook returns updatedInput with only the model changed, plus reasoning_effort where the harness takes it. Otherwise the spawn goes through as asked. About 1 in 10 spawns is left unrouted on purpose, as the control group.',
  },
  {
    n: 8, cls: 'ob', dot: 'k', label: 'Harness',
    title: 'Telemetry records counts and timings', code: 'postToolUse',
    text: 'The post-tool hook records a count and timing for each spawn. downshift report and downshift session read these, grouped by routed and control.',
  },
] as const;

export function SectionFlow() {
  return (
    <section id="flow">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">How a spawn gets its model.</h2>
          <p className="bd">
            Eight steps, all code in the repository. Your agent spawns a subagent; a local hook
            scores the task; guardrails check it; the hook rewrites the model or leaves it alone;
            telemetry records counts and timings.
          </p>
        </div>

        <ol className="fs">
          {STEPS.map((step) => (
            <li key={step.n} className={step.cls}>
              <span className="nd" aria-hidden="true">{step.n}</span>
              <div className="sb">
                <p className="ow">
                  <span className={`d ${step.dot}`} />
                  {step.label}
                </p>
                <h3>{step.title}</h3>
                <code>{step.code}</code>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
