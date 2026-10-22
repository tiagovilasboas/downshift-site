'use client';

import { useState } from 'react';

function CopyBtn({ target, label }: { target: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const el = document.getElementById(target);
    if (!el) return;
    await navigator.clipboard.writeText(el.textContent ?? '').catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      aria-label={label}
      onClick={copy}
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export function Install() {
  return (
    <section id="start">
      <div className="w">
        <div className="hd">
          <h2 className="h2x">Install, preview, then write.</h2>
          <p className="bd">
            Setup shows the diff for every harness it finds before it writes anything, saves a
            timestamped backup, and <code>--undo</code> restores it.
          </p>
        </div>

        <div className="big" id="install">
          <ol className="ics">
            <li>
              <div className="cmd">
                <code id="k1">curl -fsSL https://raw.githubusercontent.com/tiagovilasboas/downshift/main/install.sh | sh</code>
                <CopyBtn target="k1" label="Copy command" />
              </div>
              <p>Download the binary for your platform.</p>
            </li>
            <li>
              <div className="cmd">
                <code id="k2">downshift setup --dry-run</code>
                <CopyBtn target="k2" label="Copy command" />
              </div>
              <p>Print the diff. Writes nothing.</p>
            </li>
            <li>
              <div className="cmd">
                <code id="k3">downshift setup --yes</code>
                <CopyBtn target="k3" label="Copy command" />
              </div>
              <p>Write the hooks, with a backup. (Run <code>downshift setup</code> to be asked first.)</p>
            </li>
            <li>
              <div className="cmd">
                <code id="k4">downshift doctor</code>
                <CopyBtn target="k4" label="Copy command" />
              </div>
              <p>Check the binary, the hooks, state and scores.</p>
            </li>
            <li>
              <div className="cmd">
                <code id="k5">{'downshift try "rename the userId variable"'}</code>
                <CopyBtn target="k5" label="Copy command" />
              </div>
              <p>See the tier it would pick, and why.</p>
            </li>
            <li>
              <div className="cmd">
                <code id="k6">downshift setup --undo</code>
                <CopyBtn target="k6" label="Copy command" />
              </div>
              <p>Restore the latest backup.</p>
            </li>
          </ol>

          <p className="sm">
            Binaries for macOS and Linux (amd64, arm64) and Windows (amd64). On Claude Code, setup
            also sets the main session to opusplan and plan mode, unless you pass{' '}
            <code>--no-session-policy</code>. It shows a diff first.
          </p>

          <div className="cta">
            <a className="btn p" href="https://github.com/tiagovilasboas/downshift/blob/main/docs/guides/install.md" rel="noopener noreferrer">
              Install guide
              <svg className="ic ch" viewBox="0 0 24 24" aria-hidden="true"><use href="#ic" /></svg>
            </a>
            <a className="btn" href="https://github.com/tiagovilasboas/downshift/releases" rel="noopener noreferrer">
              Releases
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
