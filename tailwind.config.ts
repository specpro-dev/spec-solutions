/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Background scale */
        'bg-base':       '#080C14',
        'bg-surface':    '#0D1420',
        'bg-card':       '#111827',
        'bg-card-hover': '#161F2E',
        'navy-dark':     '#050810',

        /* Accent — precision gold/amber */
        accent: {
          DEFAULT: '#C8972F',
          light:   '#D9AA50',
          muted:   '#9A7124',
        },

        /* Functional aliases (legacy compat) */
        gold: {
          DEFAULT: '#C8972F',
          light:   '#D9AA50',
          muted:   '#9A7124',
        },
        navy: {
          DEFAULT: '#080C14',
          light:   '#0D1420',
          dark:    '#050810',
        },

        /* Text scale */
        'text-primary':   '#F0F4F8',
        'text-secondary': '#8FA3BF',
        'text-muted':     '#4A637D',
      },

      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },

      animation: {
        'fade-in':        'fadeIn 0.6s ease-out forwards',
        'marquee-scroll': 'marquee-scroll 28s linear infinite',
        'grain-shift':    'grain-shift 8s steps(2) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee-scroll': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'grain-shift': {
          '0%':   { backgroundPosition: '0 0' },
          '25%':  { backgroundPosition: '-5% -10%' },
          '50%':  { backgroundPosition: '-15% 5%' },
          '75%':  { backgroundPosition: '7% -15%' },
          '100%': { backgroundPosition: '0 0' },
        },
      },

      boxShadow: {
        'card-glow':  '0 0 0 1px rgba(200, 151, 47, 0.35), 0 8px 32px rgba(200, 151, 47, 0.08)',
        'accent-sm':  '0 0 0 3px rgba(200, 151, 47, 0.15)',
        'accent-ring':'0 0 0 2px #C8972F',
      },

      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(200, 151, 47, 0.15) 0%, transparent 60%)',
      },

      maxWidth: {
        '5xl': '64rem',
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
}
