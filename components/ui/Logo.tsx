interface LogoProps {
  size?: number
  variant?: 'horizontal' | 'stacked' | 'light' | 'dark'
  className?: string
}

// S letterform — open stroke path in a 16×25 design-unit space.
// Upper bowl opens right; lower bowl opens left — canonical S orientation.
const S_PATH =
  'M 14,1.5 L 2,1.5 C 0,1.5 0,3 0,5 L 0,9 C 0,12 2.5,13.5 5,13.5 L 11,13.5 C 13.5,13.5 16,15 16,18 L 16,20.5 C 16,23 14,25 11,25 L 2,25'

// SS monogram — two S letterforms side-by-side, accent gold stroke.
// viewBox: 44 × 30, each S occupies 16 units, 6-unit gap, 2-unit outer padding.
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
        <path transform="translate(24, 2)" d={S_PATH} />
      </g>
    </svg>
  )
}

// Wordmark — "SPEC" bold + "SOLUTIONS" light, both Plus Jakarta Sans, --text-primary.
function Wordmark({ align = 'left' }: { align?: 'left' | 'center' }) {
  const cls = align === 'center' ? 'items-center' : 'items-start'
  return (
    <div className={`flex flex-col ${cls}`} style={{ color: 'var(--text-primary)' }}>
      <span
        className="block font-bold uppercase leading-none"
        style={{ letterSpacing: '0.22em', fontSize: '14px' }}
      >
        SPEC
      </span>
      <span
        className="block font-normal uppercase leading-tight"
        style={{ letterSpacing: '0.16em', fontSize: '9px', marginTop: '2px' }}
      >
        SOLUTIONS
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
        aria-label="Spec Solutions"
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
      aria-label="Spec Solutions"
    >
      <Monogram className="h-8 w-auto" />
      <Wordmark align="left" />
    </div>
  )
}
