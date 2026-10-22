// Content from index.html section#features — do not invent numbers
export function Features() {
  return (
    <>
      {/* Three main values strip */}
      <div className="vs">
        <div className="w">
          <h2 className="h2x">Right model, shorter output, less to read.</h2>
          <ul className="v3" aria-label="Three main values">
            <li>
              <p className="pe2">
                <span className="fnm">Routing</span>
                <span className="stt">
                  <span className="d k" />
                  Completed on Claude Code
                </span>
              </p>
              <h3>Right model per subagent</h3>
              <p>
                Mechanical subagent work goes to a smaller model; risky or unclear work keeps
                yours. A local hook decides, with no extra AI call.
              </p>
              <figure className="pv">
                <div className="term">
                  <div className="tb">
                    <i /><i /><i />
                    <span>downshift try</span>
                  </div>
                  <pre className="tt tp-b" tabIndex={0}>
                    <span className="p">$ </span>
                    <span className="v">downshift try &quot;rename userId to accountId…&quot;</span>
                    {'\n'}
                    <span className="k">assumed current: claude-opus-5-5…</span>
                    {'\n'}
                    <span className="ok">→ small: opus → haiku</span>
                    {'\n'}
                    <span className="v">why: trivial task, no risk, confident</span>
                  </pre>
                </div>
                <figcaption>Real CLI output, 2026-10-21. Long lines trimmed.</figcaption>
              </figure>
            </li>

            <li>
              <p className="pe2">
                <span className="fnm">Compactor</span>
                <span className="stt">
                  <span className="d k" />
                  On by default
                </span>
              </p>
              <h3>Shorter clean output</h3>
              <p>
                Passing test runs and clean builds reach the context in a line or two. Errors,
                stack traces and failing exits stay untouched.
              </p>
              <figure className="pv">
                <div className="term">
                  <div className="tb">
                    <i /><i /><i />
                    <span>downshift compact</span>
                  </div>
                  <pre className="tt tp-b" tabIndex={0}>
                    <span className="p">$ </span>
                    <span className="v">go test ./internal/...</span>
                    {'\n'}
                    <span className="k">Go test: PASS (3 packages ok) under …</span>
                    {'\n'}
                    <span className="v">ok execwrap</span>
                    {'\n'}
                    <span className="v">ok telemetry</span>
                    {'\n'}
                    <span className="v">ok classify</span>
                    {'\n'}
                    <span className="ok">[downshift compact: compacted 205 to 119 bytes]</span>
                  </pre>
                </div>
                <figcaption>Real CLI output, 2026-10-21. Long lines trimmed.</figcaption>
              </figure>
            </li>

            <li>
              <p className="pe2">
                <span className="fnm">DCI</span>
                <span className="stt">
                  <span className="d h" />
                  Opt-in
                </span>
              </p>
              <h3>Less to read</h3>
              <p>
                When you ask for a change, the agent gets only the code it touches. Opt-in;
                measured for size and speed, not for answer quality.
              </p>
              <figure className="pv">
                <div className="term">
                  <div className="tb">
                    <i /><i /><i />
                    <span>downshift dci</span>
                  </div>
                  <pre className="tt tp-b" tabIndex={0}>
                    <span className="p">$ </span>
                    <span className="v">downshift dci impact HashSessionID</span>
                    {'\n'}
                    <span className="v">Target:        HashSessionID</span>
                    {'\n'}
                    <span className="v">Target Type:   Symbol</span>
                    {'\n'}
                    <span className="ok">Callers/Deps:  31</span>
                    {'\n'}
                    <span className="k">- cmd/downshift/cmd_test.go:TestHook…</span>
                  </pre>
                </div>
                <figcaption>Real CLI output, 2026-10-21. Long lines trimmed.</figcaption>
              </figure>
            </li>
          </ul>
        </div>
      </div>

      {/* Features list section */}
      <section id="features">
        <div className="w">
          <p className="sm fkey">
            Completed: seen working end to end. Implemented: code, tests and at least one real
            observation. Opt-in: off until you turn it on. Reports show tokens and coverage, not
            dollars.
          </p>
          <ol className="ft3">
            <li>
              <span className="fnm">1</span>
              <h3>Right model per subagent</h3>
              <span className="stt">
                <span className="d k" />
                Completed on Claude Code
              </span>
              <p className="fvl">Rewrites only the subagent&rsquo;s model, never your main session.</p>
              <p className="fcv">
                <span className="lbl">Qualifier</span>About 53% fewer tokens per completed task in
                real use, routing and compactor combined (KiroCrew, 2026-10-21, 6 control tasks —
                directional).
              </p>
            </li>
            <li>
              <span className="fnm">2</span>
              <h3>Compactor</h3>
              <span className="stt">
                <span className="d k" />
                On by default
              </span>
              <p className="fvl">
                Wraps <code>git</code>, <code>go test</code> and the other test and build tools
                listed in the docs; keeps the exit code.
              </p>
              <p className="fcv">
                <span className="lbl">Qualifier</span>Only a plain allowlisted command is rewritten;
                of the git commands, only <code>git status</code> shrinks, the rest pass through
                unchanged; automatic rewrite is Claude Code only.
              </p>
            </li>
            <li>
              <span className="fnm">3</span>
              <h3>Code intelligence, DCI</h3>
              <span className="stt">
                <span className="d h" />
                Opt-in
              </span>
              <p className="fvl">Gives the agent only the code a change touches.</p>
              <p className="fcv">
                <span className="lbl">Qualifier</span>Bytes and latency measured; answer quality not
                measured.
              </p>
            </li>
          </ol>
          <ol className="ft4" start={4}>
            <li>
              <h3>Several harnesses, honest levels</h3>
              <p className="fvl">
                One install sets up Claude Code, Codex and Cursor hooks; OpenCode is beta.
              </p>
              <p className="fcv">
                <span className="lbl">Qualifier</span>Codex and Cursor are functional, OpenCode is
                beta.
              </p>
            </li>
            <li>
              <h3>
                Guardrails{' '}
                <span className="stt">
                  <span className="d k" />
                  Implemented
                </span>
              </h3>
              <p className="fvl">
                Auth, payments, crypto and private data are never downshifted.
              </p>
              <p className="fcv">
                <span className="lbl">Qualifier</span>Detection is pattern based, English and
                Portuguese; false-positive rate on real traffic is not measured.
              </p>
            </li>
            <li>
              <h3>
                See and compare{' '}
                <span className="stt">
                  <span className="d k" />
                  Implemented
                </span>
              </h3>
              <p className="fvl">
                Switched, held or only observed, with the reason, plus routed against control.
              </p>
              <p className="fcv">
                <span className="lbl">Qualifier</span>Child token usage is observed on Claude Code
                only; the report needs 20 completed tasks per group.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
