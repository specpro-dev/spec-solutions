// Single source for brand colors. Tailwind turns each palette into CSS variables
// (`:root` = light, `.theme-ink` = black sections), and non-CSS surfaces
// (manifest, viewport, OG image, email) import the hex values directly.

const light = {
  'bg-base': '#FFFFFF',
  'bg-surface': '#F4F5F7',
  'bg-card': '#FFFFFF',
  'bg-card-hover': '#F9FAFB',
  'text-primary': '#0A0A0A',
  'text-secondary': '#4B5563',
  'text-muted': '#9CA3AF',
  'border-subtle': '#E5E7EB',
  'border-strong': '#CBD0D8',
  // Blue for text and thin icons, dark enough for AA contrast on this palette.
  'accent-text': '#2563EB',
}

const ink: Record<keyof typeof light, string> = {
  'bg-base': '#0A0A0A',
  'bg-surface': '#0A0A0A',
  'bg-card': '#141414',
  'bg-card-hover': '#1C1C1C',
  'text-primary': '#FFFFFF',
  'text-secondary': '#A3A3A3',
  'text-muted': '#737373',
  'border-subtle': '#262626',
  'border-strong': '#404040',
  'accent-text': '#60A5FA',
}

export const palettes = { light, ink }

export type ColorToken = keyof typeof light

// Brand blue, same on light and black sections.
export const accent = {
  DEFAULT: '#3B82F6',
  strong: '#1D4ED8',
  // The pill that slides across a primary button on hover.
  hover: '#1E3A8A',
}

// Primary button fill: the logo's blue → cyan, one step deeper so white text
// reads at ≥5.2:1 across the whole gradient (the logo's own cyan only reaches 2.4:1).
export const buttonGradient = ['#2563EB', '#0E7490'] as const

export const brandGradient = ['#3B82F6', '#06B6D4'] as const

export const radii = { card: '14px', button: '10px' } as const

export const shadows = {
  card: '0 1px 2px rgba(10, 10, 10, 0.04), 0 12px 32px -16px rgba(10, 10, 10, 0.18)',
  float: '0 2px 6px rgba(10, 10, 10, 0.08), 0 12px 28px -8px rgba(10, 10, 10, 0.25)',
}
