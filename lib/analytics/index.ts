declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
  }
}

export const gaId = process.env.NEXT_PUBLIC_GA_ID

// Hosts GA4 loads from and reports to; next.config's CSP allows exactly these.
export const analyticsCsp = {
  script: ['https://*.googletagmanager.com', 'https://*.google-analytics.com'],
  connect: [
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.googletagmanager.com',
  ],
}

// Every event the site sends, with the fields GA reports for it.
type Events = {
  cta_click: { label: string; location: string }
  whatsapp_click: { label: string; destination: 'whatsapp' }
  service_click: { service: string }
  form_submit: { label: 'contact_form'; status: 'success' | 'error' }
}

export type TrackedEvent = { [E in keyof Events]: { event: E; params: Events[E] } }[keyof Events]

export function trackEvent({ event, params }: TrackedEvent): void {
  window.gtag?.('event', event, params)
}
