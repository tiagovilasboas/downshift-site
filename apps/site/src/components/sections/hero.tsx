'use client';

import { motion, useReducedMotion } from 'motion/react';
import { RoutingViz } from './routing-viz';

// Stats row — exact numbers from index.html, do not invent
const STATS = [
  {
    cls: 'q',
    prefix: 'up to',
    value: '~53%',
    label: 'fewer tokens per task in real use, routing and compactor combined (KiroCrew, 2026-10-21). Routing alone: ~24% in a four-arm Claude Code trial (46 runs, one operator, 2026-10-21).',
  },
  { cls: '', prefix: '', value: '0', label: 'extra AI calls to decide' },
  { cls: '', prefix: 'about', value: '1 in 10', label: 'spawns left unrouted on purpose, as a control group' },
] as const;

export function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeUp = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <div className="w hero">
      <div className="hg">
        <div className="hh">
          <motion.div {...fadeUp} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <a className="pill" href="#evidence">
              <span className="chip">Beta</span>
              <span>Apache-2.0, Go</span>
            </a>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
          >
            <span>Your best model</span>{' '}
            <span className="h1b">shouldn&rsquo;t do every job.</span>
          </motion.h1>

          <motion.p
            className="lead"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          >
            Downshift gives your coding agent the right model for each subagent, shorter output
            from clean commands, and, if you turn it on, only the code a change touches. No extra
            AI call to decide.
          </motion.p>

          <motion.div
            className="cta"
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.21, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="btn p" href="#start">Install</a>
            <a className="btn" href="/docs/">Read the docs</a>
          </motion.div>
        </div>

        {/* Routing visualization — exact SVG from index.html, animated by ds-chat.js */}
        <RoutingViz />
      </div>

      {/* Stats row */}
      <ul className="hst" aria-label="Downshift in numbers">
        {STATS.map((s) => (
          <li key={s.value} className={s.cls || undefined}>
            {s.prefix && <span>{s.prefix}</span>}
            <b>{s.value}</b>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
