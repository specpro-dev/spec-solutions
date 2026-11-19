'use client'

import type { MouseEvent, ReactNode } from 'react'
import type { SectionId } from '@/config/site'
import { trackEvent, type TrackParams } from '@/lib/analytics'

interface SectionLinkProps {
  to: SectionId | 'top'
  children: ReactNode
  className?: string
  'aria-label'?: string
  track?: { event: string; params: TrackParams }
  onNavigate?: () => void
}

export default function SectionLink({ to, children, track, onNavigate, ...rest }: SectionLinkProps) {
  const href = to === 'top' ? '/' : `/${to}`

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    if (to === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(to)?.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', href)
    if (track) trackEvent(track.event, track.params)
    onNavigate?.()
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
