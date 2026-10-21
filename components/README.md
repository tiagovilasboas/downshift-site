# Components

Small, dependency-free web components for the site. No build step.

## `<ds-chat>`

An animated agent chat inside a generic IDE window (neutral title bar, three dots, a file tab, a chat column). It imitates no real product.

### Use it on a page

```html
<script src="/components/ds-chat.js" defer></script>

<ds-chat>
  <script type="application/json">
  {
    "title": "session.chat",
    "caption": "One line shown under the window.",
    "messages": [
      {"role": "user",      "text": "Rename the loader.",             "delay_ms": 300},
      {"role": "agent",     "text": "Searching for callers first.",   "delay_ms": 700},
      {"role": "tool",      "text": "$ grep -rn loadConfig ./src",    "delay_ms": 600},
      {"role": "downshift", "text": "helper -> small model, low effort", "delay_ms": 500}
    ]
  }
  </script>
  <!-- Optional no-JS fallback, see below -->
</ds-chat>
```

### JSON shape

| Field | Meaning |
| --- | --- |
| `title` | File tab label; also the accessible name of the log. |
| `caption` | Optional line under the window. |
| `labels` | Optional overrides for the role labels and the button: `{user, agent, tool, downshift, replay}`. Use it to translate. |
| `messages[].role` | `user`, `agent`, `tool` (monospace output) or `downshift` (green accent). Unknown roles render as `agent`. |
| `messages[].text` | Plain text, set with `textContent` (never HTML). Newlines are kept. |
| `messages[].delay_ms` | Pause before the message starts. Default 600, max 10000. |

The JSON block is data, not code, so it needs no CSP hash.

### Behaviour

- Messages appear one by one with a short typing effect when the element first enters the viewport. Once. A `Replay` button runs it again.
- `prefers-reduced-motion: reduce` renders the final state at once, with no animation.
- The container is `role="log"` with `aria-live="off"`. Every message is in the DOM as text from the start; the animation only reveals it visually, so screen readers and text search always see all of it.
- Responsive down to 375 px. Long tool lines wrap or scroll inside their own block.
- Colours and fonts come from the site tokens (`--b --c --t --m --l --a --ss --mo`) with dark defaults, and a light fallback under `prefers-color-scheme: light`. Styles live in a constructable stylesheet inside the Shadow DOM.

### No-JS fallback

Put a static list inside the element. It stays visible when JS is off or the browser lacks constructable stylesheets, and is hidden once the component renders. If the JSON is missing or invalid, the component builds the chat from this list instead (`data-role` per item):

```html
<ds-chat>
  <ol>
    <li data-role="user">Rename the loader.</li>
    <li data-role="agent">Searching for callers first.</li>
  </ol>
</ds-chat>
```

### CSP requirement

`script-src` must allow `'self'` so the page can load `/components/ds-chat.js`. The component uses no inline script, no inline style, no `eval`, no `innerHTML` and no network request, so nothing else in the policy changes. After adding inline blocks to any page, run `python3 scripts/csp-hashes.py`; it keeps `'self'`.

### Demo

`/components/demo/` shows every role. It is `noindex`.
