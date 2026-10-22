export function SectionDCI() {
  return (
    <section id="dci">
      <div className="w dci">
        <div className="dt">
          <h2 className="h2x">Send the code a change touches, not the whole repo.</h2>
          <p className="bd">
            Ask for a change and the agent starts with the callers and symbols it can reach, packed
            under a byte cap, instead of opening whole files.
          </p>
        </div>

        {/* Dependency graph SVG — exact from index.html */}
        <figure className="dgm">
          <p className="rn2">
            <code>Run 1: downshift dci impact Route</code>
          </p>
          <svg
            className="gs"
            viewBox="0 0 340 398"
            role="img"
            aria-label="Dependency graph. The function Route has four callers: runTryReport in the try command, Handle in the Claude Code adapter, Handle in the Codex adapter, and TestClassifierStability, a test."
            focusable="false"
          >
            <path className="ed e0" pathLength={1} d="M12 44V284" />
            <path className="ed e1" pathLength={1} d="M12 98H28" />
            <path className="ed e2" pathLength={1} d="M12 160H28" />
            <path className="ed e3" pathLength={1} d="M12 222H28" />
            <path className="ed e4" pathLength={1} d="M12 284H28" />
            <g className="rn">
              <rect className="gn" x={0} y={0} width={124} height={44} rx={10} />
              <text className="gr0" x={16} y={28}>Route</text>
            </g>
            <text className="gk s" x={136} y={27}>picks the tier</text>
            <g className="cn c1">
              <rect className="gn" x={28} y={72} width={312} height={52} rx={10} />
              <text className="gt" x={42} y={94}>runTryReport</text>
              <text className="gk" x={324} y={94}>try command</text>
              <text className="gf" x={42} y={112}>cmd/downshift/try.go</text>
            </g>
            <g className="cn c2">
              <rect className="gn" x={28} y={134} width={312} height={52} rx={10} />
              <text className="gt" x={42} y={156}>Handle</text>
              <text className="gk" x={324} y={156}>Claude Code adapter</text>
              <text className="gf" x={42} y={174}>internal/adapters/claudecode/claudecode.go</text>
            </g>
            <g className="cn c3">
              <rect className="gn" x={28} y={196} width={312} height={52} rx={10} />
              <text className="gt" x={42} y={218}>Handle</text>
              <text className="gk" x={324} y={218}>Codex adapter</text>
              <text className="gf" x={42} y={236}>internal/adapters/codex/codex.go</text>
            </g>
            <g className="cn c4">
              <rect className="gn" x={28} y={258} width={312} height={52} rx={10} />
              <text className="gt" x={42} y={280}>TestClassifierStability</text>
              <text className="gk" x={324} y={280}>test</text>
              <text className="gf" x={42} y={298}>internal/core/classifier_stability_test.go</text>
            </g>
            <g className="bx">
              <rect className="gx" x={28} y={334} width={312} height={64} rx={10} />
              <text className="gk" x={324} y={352}>3500 B</text>
            </g>
            <rect className="bk b1" x={44} y={362} width={56} height={24} rx={4} />
            <rect className="bk b2" x={110} y={362} width={56} height={24} rx={4} />
            <rect className="bk b3" x={176} y={362} width={56} height={24} rx={4} />
            <rect className="bk b4" x={242} y={362} width={56} height={24} rx={4} />
          </svg>
          <figcaption>
            Impact radius of Route in this repository, from{' '}
            <code>downshift dci impact --json Route</code>. Four callers. The dashed box stands for
            the packing budget (3500 bytes by default); the blocks are illustrative, not measured.
          </figcaption>
        </figure>

        <div className="ds">
          <p className="bd">
            Opt-in (<code>downshift dci enable</code>). It finds the impact radius of a symbol and
            packs only the affected code. Go by AST; TypeScript, JavaScript, Python, Rust, PHP,
            Java and C# by pattern.
          </p>
          <p className="bd">
            Benchmark: cold index 295 ms, warm p95 5.64 ms, packs 568 to 2,801 bytes.
          </p>
          <p className="hon">
            Measured so far: size and latency. Not measured: whether answers get better. Read it as
            a way to send less, not proof of better answers.
          </p>
          <a
            className="lk"
            href="https://github.com/tiagovilasboas/downshift/blob/main/docs/domains/context-optimization.md"
            rel="noopener noreferrer"
          >
            Read the DCI docs
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
