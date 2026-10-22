'use client';

import { useEffect, useRef } from 'react';

// Scenario data — exact from index.html section#action
const CHAT_DATA = {
  title: 'Downshift in an agent session',
  caption: "Illustration. The Downshift lines use the CLI's real output format.",
  labels: {
    replay: 'Replay',
    agents: 'Agents',
    scenarios: 'Scenarios',
    downshifted: 'Downshifted',
    tokens: 'Tokens',
    compactor: 'Compactor total',
    none: 'No subagents in this task.',
  },
  scenarios: [
    {
      label: 'Rename helpers',
      tokens: '~4k',
      compactor: '203 → 119 B',
      agents: [
        { title: 'Rename the five helpers', from: 'opus', to: 'haiku' },
        { title: 'List files under src', from: 'opus', to: 'haiku' },
      ],
      messages: [
        { role: 'user', text: 'Rename the five config helpers and run the tests.', delay_ms: 200 },
        { role: 'agent', text: 'Two subagents for the rename and the file list, then the tests.', delay_ms: 500 },
        { role: 'tool', kind: 'Agent', text: 'Rename the five helpers', detail: 'assumed current: claude-opus-5-5 (harness default)\n→ small: opus → haiku · its tokens would run on a cheaper model than requested\nwhy: trivial task, no risk, confident', agent: 0, time: '6s', delay_ms: 400 },
        { role: 'tool', kind: 'Agent', text: 'List files under src', detail: 'assumed current: claude-opus-5-5 (harness default)\n→ small: opus → haiku · its tokens would run on a cheaper model than requested\nwhy: trivial task, no risk, confident', agent: 1, time: '2s', delay_ms: 200 },
        { role: 'tool', kind: 'Bash', text: 'go test ./internal/...', detail: 'Go test: PASS (3 packages ok) under github.com/tiagovilasboas/downshift/internal/\nok execwrap\nok telemetry\nok classify\n[downshift compact: compacted 203 to 119 bytes]', compact: true, time: '9s', delay_ms: 300 },
        { role: 'agent', text: 'Done. Tests pass; only the compacted summary reached my context.', delay_ms: 400 },
      ],
    },
    {
      label: 'Rotate secrets',
      tokens: '~6k',
      compactor: '',
      agents: [
        { title: 'List files under src', from: 'opus', to: 'haiku' },
        { title: 'Rotate production secrets', from: 'opus', note: 'held' },
      ],
      messages: [
        { role: 'user', text: 'List the files under src and rotate the production API secrets.', delay_ms: 200 },
        { role: 'agent', text: 'Two subagents. Downshift checks each one before it starts.', delay_ms: 500 },
        { role: 'tool', kind: 'Agent', text: 'List files under src', detail: 'assumed current: claude-opus-5-5 (harness default)\n→ small: opus → haiku · its tokens would run on a cheaper model than requested\nwhy: trivial task, no risk, confident', agent: 0, time: '2s', delay_ms: 400 },
        { role: 'tool', kind: 'Agent', text: 'Rotate production secrets', detail: 'assumed current: claude-opus-5-5 (harness default)\n→ mid: opus → sonnet (not applied, tokens stay on opus)\nwhy: touches a risk area, the classifier was not confident\nnote: not rewritten: held by a guardrail', agent: 1, time: '14s', delay_ms: 200 },
        { role: 'agent', text: 'Secret rotation stayed on the requested model. I will ask before running it.', delay_ms: 400 },
      ],
    },
    {
      label: 'Run tests',
      tokens: '~1k',
      compactor: '203 → 119 B',
      agents: [],
      messages: [
        { role: 'user', text: 'Run the internal tests.', delay_ms: 200 },
        { role: 'tool', kind: 'Bash', text: 'go test ./internal/...', detail: 'Go test: PASS (3 packages ok) under github.com/tiagovilasboas/downshift/internal/\nok execwrap\nok telemetry\nok classify\n[downshift compact: compacted 203 to 119 bytes]', compact: true, time: '9s', delay_ms: 500 },
        { role: 'agent', text: 'All three packages pass. The marker shows the raw output size.', delay_ms: 400 },
      ],
    },
  ],
};

// Extend JSX intrinsic elements to include the ds-chat web component
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'ds-chat': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { class?: string };
    }
  }
}

export function DsChat() {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Load the vanilla JS ds-chat web component from public/
    const script = document.createElement('script');
    script.src = '/components/ds-chat.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <ds-chat class="dc">
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CHAT_DATA) }}
      />
    </ds-chat>
  );
}
