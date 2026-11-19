import { ImageResponse } from 'next/og'
import BrandSymbol from '@/components/ui/BrandSymbol'
import { site } from '@/config/site'
import { alpha, colors } from '@/config/theme'

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 40,
          background: `radial-gradient(ellipse 60% 70% at 50% 40%, ${alpha(colors.accent.DEFAULT, 0.35)}, ${alpha(colors.accent[2], 0.12)} 55%, ${colors['bg-base']} 80%)`,
          backgroundColor: colors['bg-base'],
        }}
      >
        <BrandSymbol gradientId="g" width={150} height={150} />
        <div style={{ color: '#FFFFFF', fontSize: 104, fontWeight: 700, letterSpacing: 6, display: 'flex' }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size }
  )
}
