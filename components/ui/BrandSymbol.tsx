import { brandGradient } from '@/config/theme'

interface BrandSymbolProps {
  /** Unique per page, since SVG gradient ids are global. */
  gradientId: string
  width: number
  height: number
}

export default function BrandSymbol({ gradientId, ...size }: BrandSymbolProps) {
  const paint = `url(#${gradientId})`
  return (
    <svg viewBox="-4 -4 108 108" fill="none" aria-hidden="true" {...size}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="90" y2="100">
          <stop offset="0" stopColor={brandGradient[0]} />
          <stop offset="1" stopColor={brandGradient[1]} />
        </linearGradient>
      </defs>
      <path
        d="M0 32 L53 0 L100 26 L79.4 38 L53 23 L29 37.5 L29 62.5 L53 77 L79.4 62 L100 74 L53 100 L0 68 Z"
        fill={paint}
        stroke={paint}
        strokeWidth={6}
        strokeLinejoin="round"
      />
    </svg>
  )
}
