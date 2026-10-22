export function Problem() {
  return (
    <section id="problem">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">Where a coding agent spends more than it needs to.</h2>
          <p className="bd">Three leaks. Downshift is one Go binary, no daemon, and acts on each.</p>
        </div>
        <ol className="pb">
          <li>
            <div>
              <h3>Subagents inherit your most expensive model</h3>
              <p className="bd">Renaming a variable gets the same model as an architecture review.</p>
            </div>
            <div className="fx">
              <p className="lbl">Fix</p>
              <p>A local hook scores the task and rewrites the model only when it is confident. In doubt, your model stays.</p>
              <p className="lbl fst">Status</p>
              <p><span className="stt"><span className="d k" />Completed on Claude Code</span></p>
            </div>
          </li>
          <li>
            <div>
              <h3>Routine output fills the context</h3>
              <p className="bd">A passing test run or a clean <code>git status</code> drops dozens of repeated lines into the context.</p>
            </div>
            <div className="fx">
              <p className="lbl">Fix</p>
              <p><code>downshift compact</code> shortens the clean run. Errors, stack traces and failing output stay byte for byte.</p>
              <p className="lbl fst">Status</p>
              <p><span className="stt"><span className="d k" />Implemented, on by default</span></p>
            </div>
          </li>
          <li>
            <div>
              <h3>The agent reads more code than the change needs</h3>
              <p className="bd">To change one symbol it opens whole files and hunts for callers.</p>
            </div>
            <div className="fx">
              <p className="lbl">Fix</p>
              <p>DCI packs only the affected symbols, under a byte cap.</p>
              <p className="lbl fst">Status</p>
              <p><span className="stt"><span className="d h" />Opt-in. Measured for latency and bytes.</span></p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
