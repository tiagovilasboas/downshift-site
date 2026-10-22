'use client';

import * as React from 'react';
import { cn } from '../lib/utils';

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[];
}

export interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'error' | 'dim' | 'blank';
  text: string;
}

function Terminal({ lines, className, ...props }: TerminalProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-card font-mono text-sm overflow-hidden',
        className,
      )}
      {...props}
    >
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-secondary-bg">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
      </div>
      {/* Content */}
      <div className="p-4 space-y-0.5">
        {lines.map((line, i) => {
          if (line.type === 'blank') return <div key={i} className="h-3" />;
          return (
            <div
              key={i}
              className={cn('leading-relaxed', {
                'text-title': line.type === 'command',
                'text-foreground': line.type === 'output',
                'text-accent': line.type === 'success',
                'text-red-400': line.type === 'error',
                'text-muted': line.type === 'dim',
              })}
            >
              {line.type === 'command' && (
                <span className="text-muted mr-2 select-none">$</span>
              )}
              <span
                dangerouslySetInnerHTML={{ __html: line.text }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { Terminal };
