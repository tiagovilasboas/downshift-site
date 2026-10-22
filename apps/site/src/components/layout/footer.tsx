export function Footer() {
  return (
    <footer>
      <div className="w">
        <div className="fw">
          <div className="fl">
            <picture>
              <source srcSet="/downshift-logo-dark.svg" media="(prefers-color-scheme:dark)" />
              <img src="/downshift-logo-light.svg" alt="Downshift" width={360} height={84} loading="lazy" />
            </picture>
            <div className="soc">
              <a href="https://github.com/tiagovilasboas/downshift" rel="noopener noreferrer" aria-label="GitHub">
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#io" /></svg>
              </a>
              <a href="https://github.com/sponsors/tiagovilasboas" rel="noopener noreferrer" aria-label="Sponsor">
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true"><use href="#ie" /></svg>
              </a>
            </div>
          </div>

          <div className="fg">
            <div>
              <p className="fh">Product</p>
              <ul>
                <li><a href="#flow">How it works</a></li>
                <li><a href="#action">See it in action</a></li>
                <li><a href="#harnesses">Harnesses</a></li>
                <li><a href="#evidence">Evidence</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <p className="fh">Docs</p>
              <ul>
                <li><a href="https://github.com/tiagovilasboas/downshift/blob/main/docs/guides/install.md" rel="noopener noreferrer">Install guide</a></li>
                <li><a href="https://github.com/tiagovilasboas/downshift/blob/main/docs/README.md" rel="noopener noreferrer">Documentation</a></li>
                <li><a href="https://github.com/tiagovilasboas/downshift/blob/main/docs/reference/capability-matrix.md" rel="noopener noreferrer">Capability matrix</a></li>
                <li><a href="/llms.txt">llms.txt</a></li>
              </ul>
            </div>
            <div>
              <p className="fh">Project</p>
              <ul>
                <li><a href="https://github.com/tiagovilasboas/downshift" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://github.com/tiagovilasboas/downshift/blob/main/CONTRIBUTING.md" rel="noopener noreferrer">Contributing</a></li>
                <li><a href="https://github.com/sponsors/tiagovilasboas" rel="noopener noreferrer">Sponsor</a></li>
                <li><a href="https://github.com/tiagovilasboas/downshift/blob/main/LICENSE" rel="noopener noreferrer">Apache-2.0 license</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="legal">
          <p>Downshift by Tiago Vilas Boas</p>
          <p className="cnpj">MONTANHA TECH &middot; CNPJ 60.782.110/0001-84</p>
        </div>
      </div>
    </footer>
  );
}
