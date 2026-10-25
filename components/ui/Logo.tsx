interface LogoProps {
  size?: number
  variant?: 'horizontal' | 'stacked' | 'light' | 'dark'
  className?: string
}

// S letterform — open stroke path in a 16×25 design-unit space.
// Upper bowl opens right; lower bowl opens left — canonical S orientation.
const S_PATH =
  'M 15,5.5 C 14,3 12,1.5 8,1.5 C 3.5,1.5 1,3.5 1,6.5 C 1,10 4.5,11.5 8,12.5 C 12,13.5 15,15 15,18.5 C 15,22 12,25 8,25 C 4,25 1.5,23 1,19.5'

// G letterform — same 16×25 space and stroke weight as S; open bowl with a crossbar.
const G_PATH =
  'M 15,6 C 14,3 12,1.5 8,1.5 C 3.5,1.5 0,4.5 0,12.5 C 0,20.5 3.5,25 8,25 C 12.5,25 16,22 16,16 L 16,13.5 L 9,13.5'

// SG monogram — S and G letterforms side-by-side, accent gold stroke.
// viewBox: 44 × 30, each letter occupies 16 units, 6-unit gap, 2-unit outer padding.
function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <g
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path transform="translate(2, 2)" d={S_PATH} />
        <path transform="translate(24, 2)" d={G_PATH} />
      </g>
    </svg>
  )
}

// Wordmark — "SPECGIG" bold, Plus Jakarta Sans, --text-primary.
function Wordmark({ align = 'left' }: { align?: 'left' | 'center' }) {
  const cls = align === 'center' ? 'items-center' : 'items-start'
  return (
    <div className={`flex flex-col ${cls}`} style={{ color: 'var(--text-primary)' }}>
      <span
        className="block font-bold uppercase leading-none"
        style={{ letterSpacing: '0.22em', fontSize: '14px' }}
      >
        SPECGIG
      </span>
    </div>
  )
}

export default function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  if (variant === 'stacked') {
    return (
      <div
        className={`flex flex-col items-center gap-2.5 ${className}`}
        role="img"
        aria-label="SpecGig"
      >
        <Monogram className="h-10 w-auto" />
        <Wordmark align="center" />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center gap-3 ${className}`}
      role="img"
      aria-label="SpecGig"
    >
      <Monogram className="h-8 w-auto" />
      <Wordmark align="left" />
    </div>
  )
}
