import type { NextConfig } from 'next'
import { sectionIds } from './config/site'
import { analyticsCsp } from './lib/analytics'

const csp = [
  "default-src 'self'",
  // Next.js hydration needs inline scripts; tighten to nonces once GA4 and the contact form are verified in production.
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${analyticsCsp.script.join(' ')}`,
  // Framer Motion writes inline styles.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  `connect-src 'self' ${analyticsCsp.connect.join(' ')}`,
  "frame-ancestors 'none'",
].join('; ')

const nextConfig: NextConfig = {
  // Next.js 16 blocks cross-origin HMR by default; allow the LAN dev machine.
  allowedDevOrigins: ['192.168.1.8'],

  // Section URLs like /services render the home page; beforeFiles runs before
  // route matching so the App Router never 404s on them.
  async rewrites() {
    return {
      beforeFiles: sectionIds.map(id => ({ source: `/${id}`, destination: '/' })),
    }
  },

  // The section used to be called Portfolio; keep old links working.
  async redirects() {
    return [{ source: '/portfolio', destination: '/case-studies', permanent: true }]
  },

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
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default nextConfig
