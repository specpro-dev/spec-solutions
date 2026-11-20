'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { trackEvent, type TrackParams } from '@/lib/analytics'

interface ContactLinkProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
  track?: { event: string; params: TrackParams }
  onNavigate?: () => void
}

// Every "Get in touch" style call to action goes to the /contact page.
export default function ContactLink({ children, track, onNavigate, ...rest }: ContactLinkProps) {
  return (
    <Link
      href="/contact"
      onClick={() => {
        onNavigate?.()
        if (track) trackEvent(track.event, track.params)
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
