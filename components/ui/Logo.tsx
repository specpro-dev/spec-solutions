import Image from 'next/image'
import { site } from '@/config/site'

// Official brand assets: never recolor with CSS filters, stretch, add shadows,
// or place on busy backgrounds (see public/brand/README.md).

const ASSETS = {
  horizontal: { src: '/brand/svg/logo-on-dark.svg', ratio: 1239 / 229 },
  symbol: { src: '/brand/svg/symbol.svg', ratio: 1 },
} as const

interface LogoProps {
  variant?: keyof typeof ASSETS
  height?: number
  className?: string
  priority?: boolean
}

export default function Logo({ variant = 'horizontal', height = 28, className = '', priority = false }: LogoProps) {
  const { src, ratio } = ASSETS[variant]
  const width = Math.round(height * ratio)
  return (
    <Image
      src={src}
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
