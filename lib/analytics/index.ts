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

export type TrackParams = Record<string, string | number | boolean>

export function trackEvent(eventName: string, params?: TrackParams): void {
  window.gtag?.('event', eventName, params)
}
