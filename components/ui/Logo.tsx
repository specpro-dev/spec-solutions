import Image from 'next/image'
import { site } from '@/config/site'

// Official brand assets: never recolor with CSS filters, stretch, add shadows,
// or place on busy backgrounds (see public/brand/README.md).

export const HORIZONTAL_RATIO = 1239 / 229
/** Width of the symbol part of the horizontal logo, as a multiple of its height. */
export const SYMBOL_RATIO = 232 / 229

const SRC = {
  horizontal: { light: '/brand/svg/logo-on-light.svg', dark: '/brand/svg/logo-on-dark.svg' },
  symbol: { light: '/brand/svg/symbol.svg', dark: '/brand/svg/symbol.svg' },
} as const

interface LogoProps {
  variant?: keyof typeof SRC
  /** The background the logo sits on. */
  on?: 'light' | 'dark'
  height?: number
  className?: string
  priority?: boolean
}

export default function Logo({
  variant = 'horizontal',
  on = 'light',
  height = 28,
  className = '',
  priority = false,
}: LogoProps) {
  const width = Math.round(height * (variant === 'horizontal' ? HORIZONTAL_RATIO : 1))
  return (
    <Image
      src={SRC[variant][on]}
      alt={site.name}
      width={width}
      height={height}
      unoptimized
      priority={priority}
      className={`block w-auto select-none ${className}`}
      style={{ height, width }}
    />
  )
}
