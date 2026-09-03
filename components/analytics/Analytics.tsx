'use client'

import Script from 'next/script'

// GA4 is loaded with strategy="afterInteractive" so it never blocks render.
// The gtag() window function is defined by the inline config script below.
// CSP note: GA4 requires https://*.googletagmanager.com in script-src.
//           This is already allowed in next.config.ts.

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // Don't render scripts if GA ID is not configured
  if (!gaId || gaId === 'G-XXXXXXXXXX') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
