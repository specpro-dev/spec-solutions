'use client'

import type { MouseEvent, ReactNode } from 'react'
import { useLenis } from 'lenis/react'
import { isHomePath, type SectionId } from '@/config/sections'
import { trackEvent, type TrackedEvent } from '@/lib/analytics'

interface SectionLinkProps {
  to: SectionId | 'top'
  children: ReactNode
  className?: string
  'aria-label'?: string
  track?: TrackedEvent
}

export default function SectionLink({ to, children, track, ...rest }: SectionLinkProps) {
  const href = to === 'top' ? '/' : `/${to}`
  const lenis = useLenis()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (track) trackEvent(track)
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    // Off the home page the browser follows the link and <SectionScroll> takes over.
    if (!isHomePath(location.pathname)) return
    const target = to === 'top' ? 0 : document.getElementById(to)
    if (target === null) return
    e.preventDefault()
    // Without Lenis the visitor prefers reduced motion, so jump instead of animating.
    if (lenis) lenis.scrollTo(target)
    else if (target === 0) window.scrollTo(0, 0)
    else target.scrollIntoView()
    history.pushState(null, '', href)
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
