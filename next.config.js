/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow local network access during development (Next.js 16+ blocks cross-origin HMR by default)
  allowedDevOrigins: ['192.168.1.8'],

  // Rewrite section paths to home — beforeFiles runs before route matching so
  // App Router never reaches its 404 handler for these shallow URLs.
  async rewrites() {
    const sectionPaths = ['services', 'portfolio', 'process', 'team', 'contact']
    return {
      beforeFiles: sectionPaths.map(id => ({
        source: `/${id}`,
        destination: '/',
      })),
    }
  },

  // Ensure images from external sources are optimised
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          /**
           * Content Security Policy
           *
           * NOTE: This CSP is deliberately permissive on script-src to allow:
           *   - GA4 / GTM (googletagmanager.com, google-analytics.com)
           *   - Next.js inline script bootstrapping ('unsafe-inline' for scripts)
           *   - Framer Motion inline style attributes (style-src 'unsafe-inline')
           *
           * VERIFY after deployment:
           *   1. Check GA4 Realtime shows a pageview — if not, CSP is blocking.
           *   2. Check contact form submits successfully.
           *   3. Tighten nonces/hashes here once those are confirmed working.
           */
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Next.js needs inline scripts for hydration; GA4/GTM need their CDN
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com",
              // Framer Motion uses inline styles extensively
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs (for inline SVG in next/image)
              "img-src 'self' data: https:",
              // Resend form POST goes to our own API route (same origin)
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
              "frame-ancestors 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
