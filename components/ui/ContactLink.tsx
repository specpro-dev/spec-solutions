'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { trackEvent, type TrackedEvent } from '@/lib/analytics'

interface ContactLinkProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
  track?: TrackedEvent
}

// Every "Get in touch" style call to action goes to the /contact page.
export default function ContactLink({ children, track, ...rest }: ContactLinkProps) {
  return (
    <Link href="/contact" onClick={() => track && trackEvent(track)} {...rest}>
      {children}
    </Link>
  )
}
