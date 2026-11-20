'use client'

import type { ReactNode } from 'react'
import { site } from '@/config/site'
import { trackEvent } from '@/lib/analytics'

const chatUrl = `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(site.whatsapp.greeting)}`

interface WhatsAppLinkProps {
  /** Where on the site the link sits; reported with the click. */
  location: string
  children: ReactNode
  className?: string
  'aria-label'?: string
}

export default function WhatsAppLink({ location, children, ...rest }: WhatsAppLinkProps) {
  return (
    <a
      href={chatUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent({ event: 'whatsapp_click', params: { label: location, destination: 'whatsapp' } })}
      {...rest}
    >
      {children}
    </a>
  )
}
