export function SectionCompact() {
  return (
    <section id="compact">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">Clean output, smaller context.</h2>
          <p className="bd">
            Passing test runs and clean builds reach your agent in a line or two. Errors, stack
            traces, diffs and any failing exit stay exactly as they were.
          </p>
        </div>

        <div className="cx">
          <div>
            <p>
              Compactor is on by default. It runs routine commands through{' '}
              <code>downshift compact</code>, which keeps the exit code and shortens only output it
              can tell is clean. It wraps every <code>git</code> subcommand and the listed test and
              build tools (go, pytest, vitest, jest, tsc, cargo, playwright, cypress, phpunit,
              gradle, maven, flutter, dart, next build). Of the git commands, only{' '}
              <code>git status</code> shrinks; the rest pass through byte for byte.
            </p>
          </div>
          <div>
            <p className="hon">
              Automatic rewrite works on Claude Code. In other harnesses your agent runs{' '}
              <code>downshift compact -- &lt;command&gt;</code> directly. This is not the{' '}
              <code>/compact</code> command: it never summarises your conversation.
            </p>
          </div>
        </div>

        <div className="cx">
          <div>
            <p>
              On the synthetic test corpus (248 files), the 26 that compact shrink by 82.3% in
              bytes, the best clean ones by 91 to 97%. Across all 248, including failures built to
              stay raw, the cut is 23.7%. Bytes, not tokens, and not your command mix.
            </p>
          </div>
          <div>
            <p>
              Turn it off with <code>&quot;exec&quot;: false</code> in the config or{' '}
              <code>DOWNSHIFT_EXEC=0</code>.
            </p>
          </div>
        </div>

        <div className="ew">
          <h3 className="h3e" id="cbh">
            Before and after, real runs
          </h3>
          <div className="term et">
            <div className="tb">
              <i /><i /><i />
              <span>downshift compactor -- go test</span>
            </div>
            <table className="cbt" aria-labelledby="cbh">
              <thead>
                <tr>
                  <th scope="col">Run</th>
                  <th scope="col">Before</th>
                  <th scope="col">After</th>
                  <th scope="col">Cut</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Full suite</th>
                  <td>4,466</td>
                  <td>2,331</td>
                  <td>−47.8%</td>
                </tr>
                <tr>
                  <th scope="row">Package 1</th>
                  <td>752</td>
                  <td>317</td>
                  <td>−57.8%</td>
                </tr>
                <tr>
                  <th scope="row">Package 2</th>
                  <td>619</td>
                  <td>238</td>
                  <td>−61.5%</td>
                </tr>
                <tr>
                  <th scope="row">Package 3</th>
                  <td>471</td>
                  <td>174</td>
                  <td>−63.1%</td>
                </tr>
                <tr>
                  <th scope="row">Package 4</th>
                  <td>278</td>
                  <td>142</td>
                  <td>−48.9%</td>
                </tr>
              </tbody>
            </table>
            <p className="etl">Single runs, 2026-10-21, bytes.</p>
          </div>
        </div>

        <a
          className="lk"
          href="https://github.com/tiagovilasboas/downshift/blob/main/README.md"
          rel="noopener noreferrer"
        >
          How it works
          <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" />
          </svg>
        </a>
      </div>
    </section>
  );
}
