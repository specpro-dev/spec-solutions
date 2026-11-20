import type { ReactNode } from 'react'
import { sections, type SectionId } from '@/config/sections'

interface SectionProps {
  /** Home page sections pass their id, which gives them a URL and a label. */
  id?: SectionId
  tone: 'base' | 'surface' | 'ink'
  children: ReactNode
}

export default function Section({ id, tone, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={id && sections[id]}
      className={`section-py ${tone === 'surface' ? 'bg-bg-surface' : 'bg-bg-base'} ${tone === 'ink' ? 'theme-ink' : ''}`}
    >
      <div className="page-container">{children}</div>
    </section>
  )
}
