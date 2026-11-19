// Single source for brand colors. Tailwind reads this, globals.css reads it
// through theme(), and non-CSS surfaces (manifest, viewport, OG image) import it.

export const colors = {
  'bg-base': '#0B1020',
  'bg-surface': '#0F1730',
  'bg-card': '#121A36',
  'bg-card-hover': '#172145',

  accent: {
    DEFAULT: '#3B82F6',
    light: '#60A5FA',
    muted: '#1D4ED8',
    2: '#06B6D4',
  },

  'text-primary': '#F5F7FF',
  'text-secondary': '#A3B1CC',
  'text-muted': '#6B7A99',

} as const

/** `#RRGGBB` → `rgba(r, g, b, a)` */
export function alpha(hex: string, a: number) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${a})`
}

export const borderColors = {
  'border-subtle': alpha(colors.accent.DEFAULT, 0.14),
  'border-accent': alpha(colors.accent.DEFAULT, 0.4),
}

export const brandGradient = [colors.accent.DEFAULT, colors.accent[2]] as const

export const radii = { card: '16px', button: '12px' } as const

export const glowBlue = `0 0 40px ${alpha(colors.accent.DEFAULT, 0.25)}`
