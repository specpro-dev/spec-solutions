import Image from 'next/image'

// CODELYNT logo — renders the official SVG assets from /public/brand/svg.
// Never recolor with CSS filters, stretch, add shadows, or place on busy backgrounds.
// Clear space: pad the wrapper by 0.5 × symbol height when placing in layouts.

type Variant = 'horizontal' | 'symbol'
type Tone = 'onDark' | 'onLight' | 'white' | 'black'

interface LogoProps {
  variant?: Variant
  tone?: Tone
  /** Rendered height in px (default 28). Width follows the asset ratio. */
  height?: number
  className?: string
  priority?: boolean
}

const RATIO = { horizontal: 1239 / 229, symbol: 1 } as const

const SRC: Record<Variant, Record<Tone, string>> = {
  horizontal: {
    onDark: '/brand/svg/logo-on-dark.svg',
    onLight: '/brand/svg/logo-on-light.svg',
    white: '/brand/svg/logo-white.svg',
    black: '/brand/svg/logo-black.svg',
  },
  symbol: {
    onDark: '/brand/svg/symbol.svg',
    onLight: '/brand/svg/symbol.svg',
    white: '/brand/svg/symbol-white.svg',
    black: '/brand/svg/symbol-black.svg',
  },
}

export default function Logo({
  variant = 'horizontal',
  tone = 'onDark',
  height = 28,
  className = '',
  priority = false,
}: LogoProps) {
  const width = Math.round(height * RATIO[variant])
  return (
    <Image
      src={SRC[variant][tone]}
      alt="CODELYNT"
      width={width}
      height={height}
      unoptimized
      priority={priority}
      className={`block w-auto select-none ${className}`}
      style={{ height, width }}
    />
  )
}
