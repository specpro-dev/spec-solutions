import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  // h1 when the section is the page's main content (e.g. /contact).
  level?: 'h1' | 'h2'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'left',
  level: Heading = 'h2',
  className = '',
}: SectionHeaderProps) {
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <Heading className="section-title">{title}</Heading>
      {lede && <p className="mt-4 text-base md:text-lg text-text-secondary">{lede}</p>}
    </Reveal>
  )
}
