import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/analytics/Analytics'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://specsolutions.lk'
const title = 'CODELYNT — Build. Innovate. Transform.'
const description =
  'A modern technology company building AI-powered solutions and scalable digital products.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'AI-powered solutions',
    'custom software development',
    'scalable digital products',
    'web application development',
    'automation',
    'Codelynt',
  ],
  authors: [{ name: 'Codelynt', url: siteUrl }],
  creator: 'Codelynt',
  publisher: 'Codelynt',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'CODELYNT',
    locale: 'en_US',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: 'any' },
      { url: '/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
}

export const viewport: Viewport = {
  themeColor: '#0B1020',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${sora.variable}`}
    >
      <body>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
