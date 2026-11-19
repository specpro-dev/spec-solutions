import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  label: string
  tone: 'base' | 'surface'
  children: ReactNode
}

export default function Section({ id, label, tone, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`section-py ${tone === 'base' ? 'bg-bg-base' : 'bg-bg-surface'}`}
    >
      <div className="page-container">{children}</div>
    </section>
  )
}
