import { ImageResponse } from 'next/og'

export const alt = 'CODELYNT — Build. Innovate. Transform.'
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
          background:
            'radial-gradient(ellipse 60% 70% at 50% 40%, rgba(59,130,246,0.35), rgba(6,182,212,0.12) 55%, #0B1020 80%)',
          backgroundColor: '#0B1020',
        }}
      >
        <svg width="150" height="150" viewBox="-4 -4 108 108">
          <defs>
            <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="90" y2="100">
              <stop offset="0" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
          <path
            d="M0 32 L53 0 L100 26 L79.4 38 L53 23 L29 37.5 L29 62.5 L53 77 L79.4 62 L100 74 L53 100 L0 68 Z"
            fill="url(#g)"
            stroke="url(#g)"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </svg>
        <div style={{ color: '#FFFFFF', fontSize: 104, fontWeight: 700, letterSpacing: 6, display: 'flex' }}>
          CODELYNT
        </div>
      </div>
    ),
    { ...size }
  )
}
