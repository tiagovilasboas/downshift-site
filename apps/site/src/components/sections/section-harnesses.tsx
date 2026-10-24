const HARNESSES = [
  {
    name: 'Claude Code',
    dot: 'k',
    level: 'Completed',
    rewrite: 'Emitted',
    used: 'Observed, 2026-10-06',
    compactor: 'Automatic rewrite; or run downshift compact -- <command>',
  },
  {
    name: 'Codex',
    dot: '',
    level: 'Functional',
    rewrite: 'Emitted',
    used: 'Inferred from the next spawn, not observed',
    compactor: 'Run the command directly',
  },
  {
    name: 'Cursor',
    dot: '',
    level: 'Functional',
    rewrite: 'Emitted',
    used: 'Unconfirmed (P1.6); child end verified 2026-10-24 on 3.27.12',
    compactor: 'Agent runs downshift compact; setup adds Shell hooks (unverified live)',
  },
  {
    name: 'OpenCode',
    dot: 'h',
    level: 'Beta',
    rewrite: 'Adapter ready; plugin in development',
    used: 'Not observed yet',
    compactor: 'Run the command directly',
  },
  {
    name: 'Antigravity',
    dot: 'e',
    level: 'Experimental',
    rewrite: 'Emitted via an undocumented field',
    used: 'Observed once, desktop 2.21.1',
    compactor: 'Run the command directly',
  },
  {
    name: 'KiroCrew',
    dot: '',
    level: 'Functional',
    rewrite: 'Block and retry (policy mode); no in-place rewrite',
    used: 'Not recorded (block and retry path)',
    compactor: 'Run downshift compact -- <command>',
  },
] as const;

export function SectionHarnesses() {
  return (
    <section id="harnesses">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">One router, six harnesses, honest levels.</h2>
          <p className="bd">
            The levels are what was observed, not what is planned. A rewrite emitted proves the hook
            answered; only the last column says whether the subagent ran on that model.
          </p>
        </div>

        <div className="ctw">
          <h3 className="h3s" id="cth">
            What each harness does with the rewrite
          </h3>
          <table className="ct" aria-labelledby="cth">
            <thead>
              <tr>
                <th scope="col">Harness</th>
                <th scope="col">Level</th>
                <th scope="col">Model rewrite</th>
                <th scope="col">Subagent used the model</th>
                <th scope="col">Compactor</th>
              </tr>
            </thead>
            <tbody>
              {HARNESSES.map((h) => (
                <tr key={h.name}>
                  <th scope="row">{h.name}</th>
                  <td data-l="Level">
                    <span className="stt">
                      <span className={`d ${h.dot}`} />
                      {h.level}
                    </span>
                  </td>
                  <td data-l="Model rewrite">{h.rewrite}</td>
                  <td data-l="Subagent used the model">{h.used}</td>
                  <td data-l="Compactor">
                    {h.compactor.includes('<command>') ? (
                      <>
                        {h.compactor.split('<command>')[0]}
                        <code>&lt;command&gt;</code>
                        {h.compactor.split('<command>')[1]}
                      </>
                    ) : (
                      h.compactor
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="sm">
            Compactor works in KiroCrew by calling the command directly (steering): 223 calls
            recorded on 2026-10-21. Compactor is a plain shell command, so it works in any harness.
            Only Claude Code rewrites it in automatically. Each harness routes its own models.
            Verified routing is Claude Code only; the others sit at the levels in the table.
            OpenRouter models are discovery only and are never routed.
          </p>
        </div>
      </div>
    </section>
  );
}
