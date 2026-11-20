import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
  // h1 when the section is the page's main content (e.g. /contact).
  level?: 'h1' | 'h2'
}

export default function SectionHeader({ eyebrow, title, lede, align = 'left', level: Heading = 'h2' }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-16 max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <Heading className="section-title">{title}</Heading>
      {lede && <p className="mt-4 text-base md:text-lg text-text-secondary">{lede}</p>}
    </Reveal>
  )
}
