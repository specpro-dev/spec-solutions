import { ImageResponse } from 'next/og'
import BrandSymbol from '@/components/ui/BrandSymbol'
import { site } from '@/config/site'
import { accent, palettes } from '@/config/theme'

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
          backgroundColor: palettes.light['bg-base'],
          borderBottom: `16px solid ${accent.DEFAULT}`,
        }}
      >
        <BrandSymbol gradientId="g" width={150} height={150} />
        <div style={{ color: palettes.light['text-primary'], fontSize: 104, fontWeight: 700, letterSpacing: 6, display: 'flex' }}>
          {site.name}
        </div>
      </div>
    ),
    { ...size }
  )
}
