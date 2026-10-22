import type { Config } from 'tailwindcss';
import animatePlugin from 'tailwindcss-animate';

// Omit 'content' — each app declares its own content paths
export const downshiftPreset: Partial<Config> = {
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        background: 'var(--b)',
        card: 'var(--c)',
        border: 'var(--l)',
        'border-muted': 'var(--l2)',
        foreground: 'var(--f)',
        title: 'var(--t)',
        muted: 'var(--m)',
        accent: 'var(--a)',
        ring: 'var(--r)',
        hint: 'var(--h)',
        'primary-bg': 'var(--pb)',
        'primary-fg': 'var(--pf)',
        'secondary-bg': 'var(--sb)',
        'secondary-fg': 'var(--sf)',
        line: 'var(--li)',
      },
      fontFamily: {
        sans: ['var(--ss)', 'system-ui', 'sans-serif'],
        mono: ['var(--mo)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        full: '9999px',
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'gear-spin': 'gearSpin 48s linear infinite',
        'gear-spin-reverse': 'gearSpinReverse 64s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gearSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        gearSpinReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [animatePlugin],
};
