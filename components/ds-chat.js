/*! <ds-chat> by Tiago Vilas Boas - Downshift, https://github.com/tiagovilasboas/downshift - Apache-2.0
   Animated agent-chat demo in a generic IDE window. Vanilla JS, no dependency, no network. */
(() => {
  "use strict";
  const TAG = "ds-chat";
  if (customElements.get(TAG)) return;

  const ROLES = ["user", "agent", "tool", "downshift"];
  const LABELS = { user: "You", agent: "Agent", tool: "Tool output", downshift: "Downshift", replay: "Replay" };
  const TICK_MS = 16; // typing step
  const TYPE_CAP_MS = { user: 1400, agent: 1800, tool: 700, downshift: 700 };

  // Styles live in a constructable stylesheet: no <style> element, so no CSP hash is needed.
  // Without constructable stylesheets the element is left alone and the author's <ol> fallback stays visible.
  const CSS = `
:host{--_bg:var(--b,#0a0a0a);--_card:var(--c,#1a1a1a);--_tx:var(--t,#fff);--_mu:var(--m,#868a90);
  --_ln:var(--l,#1f2329);--_ac:var(--a,#22c55e);--_code:rgba(255,255,255,.04);
  --_sans:var(--ss,"Geist","Geist Fallback",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif);
  --_mono:var(--mo,"Geist Mono","Geist Mono Fallback",ui-monospace,SFMono-Regular,Menlo,monospace);
  display:block;min-width:0;max-width:100%;color:var(--_tx);font-family:var(--_sans)}
@media (prefers-color-scheme:light){:host{--_bg:var(--b,#fafafa);--_card:var(--c,#fff);--_tx:var(--t,#0a0a0a);
  --_mu:var(--m,#4b5563);--_ln:var(--l,#d9dde3);--_ac:var(--a,#166534);--_code:rgba(10,10,10,.05)}}
*{box-sizing:border-box}
figure{margin:0;min-width:0}
.win{background:var(--_bg);border:1px solid var(--_ln);border-radius:12px;overflow:hidden;min-width:0}
.bar{display:flex;align-items:center;gap:12px;padding:10px 14px;background:var(--_card);border-bottom:1px solid var(--_ln)}
.dots{display:flex;gap:6px;flex:none}
.dots i{width:10px;height:10px;border-radius:50%;background:var(--_mu);opacity:.45}
.tab{font:500 12px/1.2 var(--_mono);color:var(--_tx);padding:5px 10px;background:var(--_bg);border:1px solid var(--_ln);
  border-radius:6px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.log{display:flex;flex-direction:column;gap:14px;padding:16px;min-width:0}
.row{display:flex;flex-direction:column;gap:4px;min-width:0;max-width:100%;opacity:0;transform:translateY(4px)}
.row.on{opacity:1;transform:none;transition:opacity .2s ease,transform .2s ease}
.who{font:600 11px/1 var(--_mono);letter-spacing:.04em;text-transform:uppercase;color:var(--_mu)}
.txt{font-size:14px;line-height:1.55;white-space:pre-wrap;overflow-wrap:anywhere;min-width:0}
.rest{color:transparent}
.typing .done::after{content:"";display:inline-block;width:.5ch;height:1.05em;margin-left:1px;vertical-align:text-bottom;background:var(--_ac)}
.user{align-self:flex-end;max-width:88%}
.user .txt{background:var(--_card);border:1px solid var(--_ln);border-radius:10px 10px 2px 10px;padding:8px 12px}
.user .who{align-self:flex-end}
.agent .txt{padding:0 2px}
.tool .txt{font:12.5px/1.5 var(--_mono);background:var(--_code);border:1px solid var(--_ln);border-radius:8px;
  padding:8px 10px;overflow-x:auto;max-width:100%}
.downshift{border-left:2px solid var(--_ac);padding-left:10px}
.downshift .who{color:var(--_ac)}
.downshift .txt{font:13px/1.5 var(--_mono)}
.foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px;min-width:0}
figcaption{font-size:13px;line-height:1.5;color:var(--_mu);min-width:0}
button{flex:none;font:500 12px/1 var(--_mono);color:var(--_tx);background:transparent;border:1px solid var(--_ln);
  border-radius:6px;padding:8px 12px;cursor:pointer}
button:hover{border-color:var(--_ac)}
button:focus-visible{outline:2px solid var(--_ac);outline-offset:2px}
@media (prefers-reduced-motion:reduce){.row.on{transition:none}}
@media print{.row{opacity:1;transform:none}.rest{color:inherit}button{display:none}}
`;
  let sheet = null;
  try { sheet = new CSSStyleSheet(); sheet.replaceSync(CSS); } catch (_) { sheet = null; }
  if (!sheet) return;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  };

  const num = (v, dflt, max) => (typeof v === "number" && isFinite(v) && v >= 0 ? Math.min(v, max) : dflt);

  function readData(host) {
    const script = host.querySelector(':scope > script[type="application/json"]');
    let raw = null;
    if (script) { try { raw = JSON.parse(script.textContent); } catch (_) { raw = null; } }
    if (raw && Array.isArray(raw.messages)) return raw;
    // No usable JSON: read the author's static <ol>, each <li data-role="agent"> is one message.
    const items = host.querySelectorAll(":scope > ol > li");
    if (!items.length) return null;
    return {
      title: raw && raw.title, caption: raw && raw.caption,
      messages: Array.from(items, (li) => ({ role: li.dataset.role, text: li.textContent.trim() })),
    };
  }

  class DsChat extends HTMLElement {
    #rows = [];
    #timer = 0;
    #token = 0;
    #io = null;
    #started = false;

    connectedCallback() {
      if (this.shadowRoot) return;
      const data = readData(this);
      if (!data) return; // nothing to render: leave the light DOM untouched
      const labels = Object.assign({}, LABELS, data.labels);
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [sheet];

      const fig = el("figure");
      const win = el("div", "win");
      const bar = el("div", "bar");
      const dots = el("span", "dots");
      dots.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 3; i++) dots.appendChild(el("i"));
      bar.append(dots, el("span", "tab", String(data.title || "session")));

      const log = el("div", "log");
      log.setAttribute("role", "log");
      log.setAttribute("aria-live", "off");
      log.setAttribute("aria-label", String(data.title || "Agent chat"));

      this.#rows = data.messages.map((m) => {
        const role = ROLES.includes(m && m.role) ? m.role : "agent";
        const text = String((m && m.text) || "");
        const row = el("div", "row " + role);
        const body = el("div", "txt");
        const done = el("span", "done", "");
        const rest = el("span", "rest", text);
        body.append(done, rest);
        row.append(el("div", "who", labels[role]), body);
        log.appendChild(row);
        return { row, done, rest, text, role, delay: num(m && m.delay_ms, 600, 10000) };
      });

      win.append(bar, log);
      const foot = el("div", "foot");
      if (data.caption) foot.appendChild(el("figcaption", "", String(data.caption)));
      const btn = el("button", "", labels.replay);
      btn.type = "button";
      btn.addEventListener("click", () => this.#play());
      foot.appendChild(btn);
      fig.append(win, foot);
      root.appendChild(fig);

      if (typeof IntersectionObserver === "function") {
        this.#io = new IntersectionObserver((entries) => {
          if (!entries.some((e) => e.isIntersecting) || this.#started) return;
          this.#started = true;
          this.#io.disconnect();
          this.#play();
        }, { threshold: 0.3 });
        this.#io.observe(this);
      } else {
        this.#started = true;
        this.#showAll();
      }
    }

    disconnectedCallback() {
      this.#token++;
      clearTimeout(this.#timer);
      if (this.#io) this.#io.disconnect();
    }

    #reset() {
      this.#token++;
      clearTimeout(this.#timer);
      for (const r of this.#rows) {
        r.row.classList.remove("on", "typing");
        r.done.textContent = "";
        r.rest.textContent = r.text;
      }
    }

    #showAll() {
      this.#reset();
      for (const r of this.#rows) {
        r.row.classList.add("on");
        r.done.textContent = r.text;
        r.rest.textContent = "";
      }
    }

    #play() {
      const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { this.#showAll(); return; }
      this.#reset();
      const token = this.#token;
      let i = 0;
      const next = () => {
        if (token !== this.#token || i >= this.#rows.length) return;
        const r = this.#rows[i++];
        this.#timer = setTimeout(() => {
          if (token !== this.#token) return;
          r.row.classList.add("on", "typing");
          this.#type(r, token, next);
        }, r.delay);
      };
      next();
    }

    // Moves characters from the transparent tail to the visible head. The full text never leaves the DOM.
    #type(r, token, then) {
      const total = r.text.length;
      const step = Math.max(1, Math.ceil(total / (TYPE_CAP_MS[r.role] / TICK_MS)));
      let n = 0;
      const tick = () => {
        if (token !== this.#token) return;
        n = Math.min(total, n + step);
        r.done.textContent = r.text.slice(0, n);
        r.rest.textContent = r.text.slice(n);
        if (n < total) { this.#timer = setTimeout(tick, TICK_MS); return; }
        r.row.classList.remove("typing");
        then();
      };
      tick();
    }
  }

  customElements.define(TAG, DsChat);
})();
