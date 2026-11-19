import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import { accent, buttonGradient, palettes, radii, shadows, type ColorToken } from './config/theme'

const tokens = Object.keys(palettes.light) as ColorToken[]

const rgbChannels = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(' ')

const cssVars = (palette: Record<ColorToken, string>) =>
  Object.fromEntries(tokens.map(t => [`--c-${t}`, rgbChannels(palette[t])]))

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...Object.fromEntries(tokens.map(t => [t, `rgb(var(--c-${t}) / <alpha-value>)`])),
        accent,
      },
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      borderRadius: radii,
      boxShadow: shadows,
      backgroundImage: {
        // Same blue → cyan diagonal as the logo symbol, in button-safe shades.
        'gradient-button': `linear-gradient(135deg, ${buttonGradient.join(', ')})`,
      },
    },
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        ':root': cssVars(palettes.light),
        '.theme-ink': { ...cssVars(palettes.ink), color: 'rgb(var(--c-text-primary))' },
      })
    }),
  ],
}

export default config
