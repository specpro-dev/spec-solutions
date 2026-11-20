'use client'

import type { MouseEvent, ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { useLenis } from 'lenis/react'
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
  const lenis = useLenis()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const onHome = document.getElementById('services') !== null
    const target = to === 'top' ? (onHome ? 0 : null) : document.getElementById(to)
    // Not on the home page (e.g. /privacy): let the browser follow the link.
    if (target === null) return
    e.preventDefault()
    // Commit onNavigate first (e.g. the mobile menu closing and releasing its scroll lock).
    flushSync(() => onNavigate?.())
    // Without Lenis the visitor prefers reduced motion, so jump instead of animating.
    if (lenis) lenis.scrollTo(target)
    else if (target === 0) window.scrollTo(0, 0)
    else target.scrollIntoView()
    history.pushState(null, '', href)
    if (track) trackEvent(track.event, track.params)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
