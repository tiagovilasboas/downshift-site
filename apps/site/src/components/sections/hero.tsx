'use client';

import { motion } from 'motion/react';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stats = [
  {
    pre: 'up to',
    value: '~53%',
    label:
      'fewer tokens per task in real use, routing and compactor combined (KiroCrew, 2026-10-21). Routing alone: ~24% in a four-arm Claude Code trial (46 runs, one operator, 2026-10-21).',
  },
  {
    pre: null,
    value: '0',
    label: 'extra AI calls to decide',
  },
  {
    pre: 'about',
    value: '1 in 10',
    label: 'spawns left unrouted on purpose, as a control group',
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.a
              href="#evidence"
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary-bg px-3 py-1 text-xs text-muted transition-colors hover:text-title"
            >
              <span className="rounded-full bg-accent/10 px-2 py-0.5 font-medium text-accent">Beta</span>
              <span>Apache-2.0, Go</span>
            </motion.a>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mt-6 text-balance text-4xl font-semibold leading-tight tracking-tight text-title sm:text-5xl"
            >
              <span className="block">Your best model</span>
              <span className="block text-muted">shouldn&apos;t do every job.</span>
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-6 max-w-xl text-pretty text-lg text-foreground"
            >
              Downshift gives your coding agent the right model for each subagent,
              shorter output from clean commands, and, if you turn it on, only the
              code a change touches. No extra AI call to decide.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href="#start"
                className="inline-flex h-11 items-center rounded-full bg-primary-bg px-6 text-sm font-medium text-primary-fg transition-opacity hover:opacity-90"
              >
                Install
              </a>
              <a
                href="/docs/"
                className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors hover:border-muted"
              >
                Read the docs
              </a>
            </motion.div>
          </div>

          {/* Routing visualization — built in M3 */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.32 }}
            className="flex min-h-[300px] items-center justify-center rounded-xl border border-border bg-card p-8"
            aria-hidden="true"
          >
            <p className="text-sm text-muted">🚧 Routing visualization — M3</p>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.ul
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.4 }}
          aria-label="Downshift in numbers"
          className="mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <li key={s.value} className="flex flex-col gap-1">
              {s.pre ? <span className="text-xs text-muted">{s.pre}</span> : null}
              <b className="text-3xl font-semibold text-title">{s.value}</b>
              <span className="text-sm text-muted">{s.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
