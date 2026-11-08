/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-base':       '#0B1020',
        'bg-surface':    '#0F1730',
        'bg-card':       '#121A36',
        'bg-card-hover': '#172145',

        accent: {
          DEFAULT: '#3B82F6',
          light:   '#60A5FA',
          muted:   '#1D4ED8',
          2:       '#06B6D4',
        },

        'text-primary':   '#F5F7FF',
        'text-secondary': '#A3B1CC',
        'text-muted':     '#6B7A99',
      },

      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },

      borderRadius: {
        card:   '16px',
        button: '12px',
      },

      boxShadow: {
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.25)',
      },

      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #3B82F6, #06B6D4)',
      },

      maxWidth: {
        '5xl': '64rem',
        '7xl': '80rem',
      },
    },
  },
  plugins: [],
}
