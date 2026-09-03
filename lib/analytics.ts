// gtag analytics helpers
// Usage: import { trackEvent } from '@/lib/analytics'
//        trackEvent('cta_click', { label: 'hero_audit' })

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === 'undefined') return
  if (!window.gtag) return
  window.gtag('event', eventName, params)
}
