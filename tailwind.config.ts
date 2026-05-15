import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        white: '#f5f3ee',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8d4a0',
        },
        mid: '#1a1a1a',
        muted: '#666',
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderColor: {
        'gold-faint': 'rgba(201,168,76,0.2)',
      },
      keyframes: {
        'scroll-brands': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'scroll-brands': 'scroll-brands 45s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
