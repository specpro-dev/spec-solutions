import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  label: string
  tone: 'base' | 'surface' | 'ink'
  children: ReactNode
}

export default function Section({ id, label, tone, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`section-py ${tone === 'surface' ? 'bg-bg-surface' : 'bg-bg-base'} ${tone === 'ink' ? 'theme-ink' : ''}`}
    >
      <div className="page-container">{children}</div>
    </section>
  )
}
