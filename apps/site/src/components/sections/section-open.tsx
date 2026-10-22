export function SectionOpen() {
  return (
    <section id="open">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">Open source, Apache-2.0.</h2>
          <p className="bd">
            Built in the open by Tiago Vilas Boas. The most useful contribution is a misrouted
            prompt: run <code>downshift try</code> with it, compare the tier with what you expected,
            and open an issue with both.
          </p>
        </div>

        <div className="cta" id="contribute">
          <a
            className="btn p"
            href="https://github.com/tiagovilasboas/downshift/issues/new/choose"
            rel="noopener noreferrer"
          >
            Report a misroute
            <svg className="ic ch" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" />
            </svg>
          </a>
          <a
            className="btn"
            href="https://github.com/tiagovilasboas/downshift/blob/main/CONTRIBUTING.md"
            rel="noopener noreferrer"
          >
            Contribute
          </a>
          <a
            className="btn"
            href="https://github.com/tiagovilasboas/downshift"
            rel="noopener noreferrer"
          >
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m8 7-5 5 5 5M16 7l5 5-5 5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" />
            </svg>
            Star on GitHub
          </a>
        </div>

        <div className="sp" id="sponsor">
          <p>Sponsorship funds maintenance, benchmarks and the model catalog.</p>
          <a
            className="btn"
            href="https://github.com/sponsors/tiagovilasboas"
            rel="noopener noreferrer"
          >
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" stroke="currentColor" />
            </svg>
            Sponsor
          </a>
        </div>
      </div>
    </section>
  );
}
