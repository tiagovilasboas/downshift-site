# Components

Small, dependency-free web components for the site. No build step.

## `<ds-chat>`

A compact agent session in a generic IDE window: scenario tabs on top, a chat column with one collapsible row per tool call, and an Agents panel with three tiles and one row per subagent. It imitates no real product.

### Use it on a page

```html
<script src="/components/ds-chat.js" defer></script>

<ds-chat>
  <script type="application/json">
  {
    "title": "Agent session",
    "caption": "One line shown under the window.",
    "scenarios": [
      {
        "label": "Rename helpers",
        "tokens": "~4k",
        "compactor": "203 → 119 B",
        "agents": [{"title": "Rename the helpers", "from": "opus", "to": "haiku"}],
        "messages": [
          {"role": "user",  "text": "Rename the helpers."},
          {"role": "agent", "text": "One subagent for the rename."},
          {"role": "tool",  "kind": "Agent", "text": "Rename the helpers", "agent": 0, "time": "6s",
           "detail": "→ small: opus → haiku · its tokens would run on a cheaper model than requested"},
          {"role": "tool",  "kind": "Bash", "text": "go test ./...", "compact": true, "time": "9s",
           "detail": "[downshift compact: compacted 203 to 119 bytes]"}
        ]
      }
    ]
  }
  </script>
</ds-chat>
```

### JSON shape

| Field | Meaning |
| --- | --- |
| `title` | Accessible name of the chat log. |
| `caption` | Optional line under the window. |
| `labels` | Optional UI strings: `{replay, agents, scenarios, downshifted, tokens, compactor, none}`. Use it to translate. |
| `scenarios[].label` | Tab label. Tabs show only when there is more than one scenario. |
| `scenarios[].tokens` | Value of the Tokens tile, shown when the script ends. Keep it visibly illustrative. |
| `scenarios[].compactor` | Value of the Compactor tile, shown after a row with `compact: true` finishes. |
| `scenarios[].agents[]` | `{title, from, to, note}`. A row in the Agents panel. With `to`, the model chip swaps from `from` to `to` and counts as downshifted; without it, the chip stays and `note` (e.g. "held") appears. |
| `messages[].role` | `user`, `agent` or `tool`. Unknown roles render as `agent`. |
| `messages[].text` | Plain text (`textContent`, never HTML). For `tool`, the one-line row summary. |
| `messages[].kind` | Tool name on the row, e.g. `Agent` or `Bash`. |
| `messages[].detail` | Text revealed when the row is expanded (Downshift decision lines, compacted output). |
| `messages[].agent` | Index into `agents[]` that this row drives (progress bar, chip swap, check mark). |
| `messages[].time` | Shown on the row once it finishes. |
| `messages[].delay_ms` | Pause before the message. Default 500, max 10000. |

Backward compatible: a v1 block with top-level `messages[]` (roles `user`, `agent`, `tool`, `downshift`) renders as one scenario, with `tool` and `downshift` messages as collapsed rows. The JSON block is data, not code, so it needs no CSP hash.

### Behaviour

- The scenario plays once when the element enters the viewport: rows appear in order, tool rows spin, the subagent's chip swaps, rows settle with a check mark. Clicking a tab plays that scenario; `Replay` plays the current one again.
- Tool rows are `<button aria-expanded>` controlling their detail; click, Enter or Space toggles them.
- `prefers-reduced-motion: reduce` shows the final state at once.
- The chat is `role="log"` with `aria-live="off"`; every message is in the DOM as text before the animation starts.
- About 400 px tall on desktop (chat 60 %, Agents 40 %). Below 620 px of its own width (container query) it becomes one column with the tiles as a strip above the chat. No horizontal overflow at 375 px.
- Colours and fonts come from the site tokens (`--b --c --t --m --l --a --ss --mo`) with dark defaults. Styles live in a constructable stylesheet inside the Shadow DOM.

### No-JS fallback

Put a static list inside the element. It stays visible when JS is off or the browser lacks constructable stylesheets. If the JSON is missing or invalid, the component builds one scenario from this list (`data-role` per item):

```html
<ds-chat>
  <ol>
    <li data-role="user">Rename the loader.</li>
    <li data-role="agent">Searching for callers first.</li>
  </ol>
</ds-chat>
```

### CSP requirement

`script-src` must allow `'self'` so the page can load `/components/ds-chat.js`. The component uses no inline script, no inline style, no `eval`, no `innerHTML` and no network request. After editing inline blocks on any page, run `python3 scripts/csp-hashes.py`.

### Demo

`/components/demo/` shows two scenarios and the v1 fallback. It is `noindex`.
