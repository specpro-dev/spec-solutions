import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  lede?: ReactNode
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, title, lede, align = 'left' }: SectionHeaderProps) {
  const centered = align === 'center'
  return (
    <Reveal className={`mb-16 max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {lede && <p className="mt-4 text-base md:text-lg text-text-secondary">{lede}</p>}
    </Reveal>
  )
}
