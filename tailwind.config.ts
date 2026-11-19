import type { Config } from 'tailwindcss'
import { colors, borderColors, radii, glowBlue, brandGradient } from './config/theme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { ...colors, ...borderColors },
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      borderRadius: radii,
      boxShadow: { 'glow-blue': glowBlue },
      backgroundImage: {
        'gradient-brand': `linear-gradient(135deg, ${brandGradient.join(', ')})`,
      },
    },
  },
  plugins: [],
}

export default config
