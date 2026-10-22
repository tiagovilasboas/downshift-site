/*! <ds-chat> by Tiago Vilas Boas - Downshift, https://github.com/tiagovilasboas/downshift - Apache-2.0
   Compact agent session demo: a chat column with collapsible tool rows and an Agents panel.
   Vanilla JS, no dependency, no network, textContent only. */
(() => {
  "use strict";
  const TAG = "ds-chat";
  if (customElements.get(TAG)) return;

  const LABELS = { replay: "Replay", agents: "Agents", scenarios: "Scenarios", downshifted: "Downshifted",
    tokens: "Tokens", compactor: "Compactor total", held: "held", none: "No subagents in this task." };
  const RUN_MS = 1500;   // how long a tool row spins; matches the .fill animation below
  const SWAP_MS = 550;   // when the model chip changes after a subagent starts

  // Constructable stylesheet: no <style> element, so no CSP hash. Without it the light DOM fallback stays.
  const CSS = `
:host{--_bg:var(--b,#0a0a0a);--_card:var(--c,#1a1a1a);--_tx:var(--t,#fff);--_mu:var(--m,#868a90);
  --_ln:var(--l,#1f2329);--_ac:var(--a,#22c55e);--_code:rgba(255,255,255,.04);
  --_sans:var(--ss,"Geist","Geist Fallback",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif);
  --_mono:var(--mo,"Geist Mono","Geist Mono Fallback",ui-monospace,SFMono-Regular,Menlo,monospace);
  display:block;min-width:0;max-width:100%;color:var(--_tx);font-family:var(--_sans);container-type:inline-size}
@media (prefers-color-scheme:light){:host{--_bg:var(--b,#fafafa);--_card:var(--c,#fff);--_tx:var(--t,#0a0a0a);
  --_mu:var(--m,#4b5563);--_ln:var(--l,#d9dde3);--_ac:var(--a,#166534);--_code:rgba(10,10,10,.05)}}
*{box-sizing:border-box}
figure{margin:0;min-width:0}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
button:focus-visible{outline:2px solid var(--_ac);outline-offset:2px;border-radius:6px}
.win{background:var(--_bg);border:1px solid var(--_ln);border-radius:12px;overflow:hidden;min-width:0}
.bar{display:flex;align-items:center;gap:4px;padding:6px 8px;background:var(--_card);border-bottom:1px solid var(--_ln);
  overflow-x:auto;scrollbar-width:none}
.tab{flex:none;font:500 12px/1 var(--_mono);color:var(--_mu);padding:8px 12px;border:1px solid transparent;border-radius:6px;min-height:32px}
.tab:hover{color:var(--_tx)}
.tab[aria-pressed="true"]{color:var(--_tx);background:var(--_bg);border-color:var(--_ln)}
.bd{display:grid;grid-template-columns:minmax(0,3fr) minmax(0,2fr);height:360px;min-width:0}
.chat{overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-width:0;scrollbar-width:thin}
.row{min-width:0;opacity:0;transform:translateY(3px)}
.row.on{opacity:1;transform:none;transition:opacity .2s ease,transform .2s ease}
.user{align-self:flex-end;max-width:86%;font-size:13.5px;line-height:1.45;background:var(--_card);border:1px solid var(--_ln);
  border-radius:10px 10px 2px 10px;padding:7px 11px}
.agent{font-size:13.5px;line-height:1.5;padding:0 2px}
.tr{display:flex;align-items:center;gap:8px;width:100%;min-height:32px;padding:6px 8px;text-align:left;
  font:12.5px/1.3 var(--_mono);border:1px solid var(--_ln);border-radius:8px;background:var(--_code)}
.tr:hover{border-color:var(--_mu)}
.kd{flex:none;font-weight:600}
.tt{flex:1;min-width:0;color:var(--_mu);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.tm{flex:none;color:var(--_mu);font-size:11.5px}
.cv{flex:none;color:var(--_mu);transition:transform .15s ease}
.tr[aria-expanded="true"] .cv{transform:rotate(90deg)}
.st{flex:none;width:12px;height:12px;display:grid;place-items:center;font-size:11px;line-height:1;color:var(--_ac)}
.run .st{border:1.5px solid var(--_ln);border-top-color:var(--_ac);border-radius:50%;animation:spin .7s linear infinite}
.dt{margin:4px 0 0;padding:8px 10px;font:12px/1.5 var(--_mono);white-space:pre-wrap;overflow-wrap:anywhere;
  border-left:2px solid var(--_ac);background:var(--_code);border-radius:0 6px 6px 0}
.pn{border-left:1px solid var(--_ln);padding:14px;display:flex;flex-direction:column;gap:12px;min-width:0;overflow-y:auto}
.tl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px}
.ti{background:var(--_code);border-radius:8px;padding:7px 8px;min-width:0}
.tv{display:block;font:600 15px/1.2 var(--_mono)}
.tk{display:block;font-size:11px;line-height:1.3;color:var(--_mu);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ph{margin:0;font-size:12px;font-weight:600;color:var(--_mu)}
.ag{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:10px}
.ar{display:grid;grid-template-columns:12px minmax(0,1fr) auto;align-items:center;gap:4px 8px;opacity:.45}
.ar.run,.ar.ok{opacity:1}
.an{font-size:12.5px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ch{font:500 11px/1 var(--_mono);padding:4px 7px;border:1px solid var(--_ln);border-radius:999px;transition:color .3s,border-color .3s}
.ch.dn{color:var(--_ac);border-color:var(--_ac)}
.nt{font:11px/1 var(--_mono);color:var(--_mu);margin-left:4px}
.pb{grid-column:2/4;height:3px;border-radius:2px;background:var(--_ln);overflow:hidden}
.pb i{display:block;height:100%;background:var(--_ac);transform:scaleX(0);transform-origin:left}
.ar.run .pb i{animation:fill ${RUN_MS}ms linear forwards}
.ar.ok .pb i{transform:none;animation:none}
.em{margin:0;font-size:12.5px;color:var(--_mu)}
.foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px;min-width:0}
figcaption{font-size:13px;line-height:1.5;color:var(--_mu);min-width:0}
.rp{flex:none;font:500 12px/1 var(--_mono);border:1px solid var(--_ln);border-radius:6px;padding:9px 12px;min-height:32px}
.rp:hover{border-color:var(--_ac)}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
@keyframes spin{to{transform:rotate(1turn)}}
@keyframes fill{to{transform:none}}
@container (max-width:620px){
  .bd{grid-template-columns:minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);height:400px}
  .pn{order:-1;border-left:0;border-bottom:1px solid var(--_ln);padding:8px 10px;overflow:visible}
  .ph,.ag,.em{display:none}
  .ti{padding:5px 7px}.tv{font-size:13px}
}
@media (prefers-reduced-motion:reduce){.row.on,.ch,.cv{transition:none}.run .st{animation:none}}
@media print{.row{opacity:1;transform:none}.rp{display:none}}
`;
  let sheet = null;
  try { sheet = new CSSStyleSheet(); sheet.replaceSync(CSS); } catch (_) { sheet = null; }
  if (!sheet) return;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = String(text);
    return n;
  };
  const str = (v) => (v === undefined || v === null ? "" : String(v));
  const num = (v, dflt, max) => (typeof v === "number" && isFinite(v) && v >= 0 ? Math.min(v, max) : dflt);
  const reduced = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  let uid = 0;

  // v1 messages (roles user, agent, tool, downshift) become one scenario; tool and downshift turn into rows.
  function legacy(m) {
    const role = m && m.role, text = str(m && m.text);
    if (role === "tool" || role === "downshift") {
      return { role: "tool", kind: role === "tool" ? "Tool" : "Downshift", text: text.split("\n")[0], detail: text, delay_ms: m.delay_ms };
    }
    return { role: role === "user" ? "user" : "agent", text, delay_ms: m && m.delay_ms };
  }

  function readData(host) {
    const script = host.querySelector(':scope > script[type="application/json"]');
    let raw = null;
    if (script) { try { raw = JSON.parse(script.textContent); } catch (_) { raw = null; } }
    if (raw && Array.isArray(raw.scenarios) && raw.scenarios.length) return raw;
    let msgs = raw && Array.isArray(raw.messages) ? raw.messages : null;
    if (!msgs) {
      const items = host.querySelectorAll(":scope > ol > li");
      if (!items.length) return null;
      msgs = Array.from(items, (li) => ({ role: li.dataset.role, text: li.textContent.trim() }));
    }
    return Object.assign({}, raw, { scenarios: [{ label: str(raw && raw.title) || "session", messages: msgs.map(legacy) }] });
  }

  class DsChat extends HTMLElement {
    #d = null; #L = null; #i = 0; #tok = 0; #timers = []; #io = null; #seen = false;
    #tabs = []; #chat = null; #pn = null; #ui = null;

    connectedCallback() {
      if (this.shadowRoot) return;
      const data = readData(this);
      if (!data) return;
      this.#d = data;
      this.#L = Object.assign({}, LABELS, data.labels);
      const root = this.attachShadow({ mode: "open" });
      root.adoptedStyleSheets = [sheet];

      const fig = el("figure"), win = el("div", "win"), bar = el("div", "bar");
      bar.setAttribute("role", "group");
      bar.setAttribute("aria-label", this.#L.scenarios);
      this.#tabs = data.scenarios.map((s, i) => {
        const b = el("button", "tab", str(s && s.label) || "session " + (i + 1));
        b.type = "button";
        b.addEventListener("click", () => this.#select(i, true));
        bar.appendChild(b);
        return b;
      });
      const bd = el("div", "bd");
      this.#chat = el("div", "chat");
      this.#chat.setAttribute("role", "log");
      this.#chat.setAttribute("aria-live", "off");
      this.#chat.setAttribute("aria-label", str(data.title) || "Agent chat");
      this.#pn = el("aside", "pn");
      this.#pn.setAttribute("aria-label", this.#L.agents);
      bd.append(this.#chat, this.#pn);
      win.append(data.scenarios.length > 1 ? bar : el("div"), bd);

      const foot = el("div", "foot");
      if (data.caption) foot.appendChild(el("figcaption", "", data.caption));
      const rp = el("button", "rp", this.#L.replay);
      rp.type = "button";
      rp.addEventListener("click", () => this.#select(this.#i, true));
      foot.appendChild(rp);
      fig.append(win, foot);
      root.appendChild(fig);

      this.#select(0, false);
      this.#final();
      if (typeof IntersectionObserver === "function" && !reduced()) {
        this.#io = new IntersectionObserver((es) => {
          if (this.#seen || !es.some((e) => e.isIntersecting)) return;
          this.#seen = true;
          this.#io.disconnect();
          this.#play();
        }, { threshold: 0.4 });
        this.#io.observe(this);
      }
    }

    disconnectedCallback() { this.#stop(); if (this.#io) this.#io.disconnect(); }

    #stop() { this.#tok++; this.#timers.forEach(clearTimeout); this.#timers = []; }
    #later(ms, fn) { const t = this.#tok; this.#timers.push(setTimeout(() => { if (t === this.#tok) fn(); }, ms)); }

    #select(i, play) {
      this.#stop();
      this.#seen = true;
      this.#i = i;
      this.#tabs.forEach((b, j) => b.setAttribute("aria-pressed", String(j === i)));
      this.#build(this.#d.scenarios[i] || {});
      if (play) { if (reduced()) this.#final(); else this.#play(); }
    }

    // Builds the scenario's whole DOM up front: every message is text in the DOM before any animation.
    #build(s) {
      const L = this.#L;
      const agents = (Array.isArray(s.agents) ? s.agents : []).map((a) => {
        const li = el("li", "ar"), st = el("span", "st"), ch = el("span", "ch", str(a && a.from) || "opus");
        st.setAttribute("aria-hidden", "true");
        const bar = el("span", "pb"); bar.appendChild(el("i"));
        const nt = el("span", "nt");
        const name = el("span", "an", str(a && a.title));
        name.appendChild(nt);
        li.append(st, name, ch, bar);
        return { li, st, ch, nt, from: str(a && a.from) || "opus", to: str(a && a.to), note: str(a && a.note) };
      });
      const rows = (Array.isArray(s.messages) ? s.messages : []).map((m) => this.#row(m || {}));
      this.#chat.replaceChildren(...rows.map((r) => r.node));

      const tile = (k) => { const d = el("div", "ti"), v = el("span", "tv", "–"); d.append(v, el("span", "tk", k)); return { d, v }; };
      const t = { ds: tile(L.downshifted), tk: tile(L.tokens), cp: tile(L.compactor) };
      const tl = el("div", "tl"); tl.append(t.ds.d, t.tk.d, t.cp.d);
      const ag = el("ul", "ag"); agents.forEach((a) => ag.appendChild(a.li));
      this.#pn.replaceChildren(tl, el("p", "ph", L.agents), agents.length ? ag : el("p", "em", L.none));
      this.#ui = { s, rows, agents, t, moved: 0 };
      this.#tiles();
    }

    #row(m) {
      const role = m.role === "user" || m.role === "tool" ? m.role : "agent";
      const r = { m, role, delay: num(m.delay_ms, 500, 10000) };
      if (role !== "tool") { r.node = el("div", "row " + role, str(m.text)); return r; }
      const node = el("div", "row"), btn = el("button", "tr"), st = el("span", "st"), tm = el("span", "tm");
      st.setAttribute("aria-hidden", "true");
      const cv = el("span", "cv", "›"); cv.setAttribute("aria-hidden", "true");
      btn.type = "button";
      btn.append(st, el("span", "kd", str(m.kind) || "Tool"), el("span", "tt", str(m.text)), tm, cv);
      node.appendChild(btn);
      if (m.detail) {
        const dt = el("pre", "dt", m.detail);
        dt.id = "d" + ++uid;
        dt.hidden = true;
        btn.setAttribute("aria-controls", dt.id);
        btn.setAttribute("aria-expanded", "false");
        btn.addEventListener("click", () => {
          const open = btn.getAttribute("aria-expanded") !== "true";
          btn.setAttribute("aria-expanded", String(open));
          dt.hidden = !open;
        });
        node.appendChild(dt);
      }
      Object.assign(r, { node, btn, st, tm });
      return r;
    }

    #tiles() {
      const u = this.#ui, s = u.s, n = u.agents.length;
      const done = u.rows.length && u.rows.every((r) => r.node.classList.contains("on") && !r.btn?.classList.contains("run"));
      u.t.ds.v.textContent = n ? u.moved + "/" + n : "–";
      u.t.tk.v.textContent = done && s.tokens ? str(s.tokens) : "–";
      u.t.cp.v.textContent = u.cp ? str(s.compactor) : "–";
    }

    #startTool(r) {
      r.btn.classList.add("run");
      const a = this.#ui.agents[r.m.agent];
      if (a) { a.li.classList.add("run"); a.ch.textContent = a.from; }
    }

    #swap(r) {
      const a = this.#ui.agents[r.m.agent];
      if (!a) return;
      if (a.to && a.to !== a.from) { a.ch.textContent = a.to; a.ch.classList.add("dn"); this.#ui.moved++; }
      else if (a.note) a.nt.textContent = a.note;
      this.#tiles();
    }

    #endTool(r) {
      r.btn.classList.remove("run");
      r.st.textContent = "✓";
      r.tm.textContent = str(r.m.time);
      const a = this.#ui.agents[r.m.agent];
      if (a) { a.li.classList.remove("run"); a.li.classList.add("ok"); a.st.textContent = "✓"; }
      if (r.m.compact) this.#ui.cp = true;
      this.#tiles();
    }

    #show(r) {
      r.node.classList.add("on");
      this.#chat.scrollTop = this.#chat.scrollHeight;
    }

    #final() {
      this.#stop();
      this.#build(this.#ui.s);
      for (const r of this.#ui.rows) {
        r.node.classList.add("on");
        if (r.role === "tool") { this.#startTool(r); this.#swap(r); this.#endTool(r); }
      }
      this.#tiles();
    }

    // The one orchestrated motion: rows appear in order, tool rows spin, the model chip swaps, rows settle.
    #play() {
      this.#stop();
      this.#build(this.#ui.s);
      const rows = this.#ui.rows;
      let at = 0;
      for (const r of rows) {
        at += r.delay;
        const t0 = at;
        this.#later(t0, () => { this.#show(r); if (r.role === "tool") this.#startTool(r); });
        if (r.role === "tool") {
          this.#later(t0 + SWAP_MS, () => this.#swap(r));
          this.#later(t0 + RUN_MS, () => this.#endTool(r));
          at += RUN_MS;
        }
      }
      this.#later(at + 50, () => this.#tiles());
    }
  }

  customElements.define(TAG, DsChat);
})();
