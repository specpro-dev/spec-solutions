import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/analytics/Analytics'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  preload: true,
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: true,
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://specsolutions.lk'

export const metadata: Metadata = {
  title: 'Custom Software Development for Businesses in Sri Lanka | Spec Solutions',
  description:
    'Spec Solutions builds custom web applications, booking systems, and automation tools for businesses in Sri Lanka. Custom-coded, Lighthouse 95+, no templates. Based in Kalutara & Colombo.',
  keywords: [
    'custom software development Sri Lanka',
    'web application development Kalutara',
    'booking system Sri Lanka',
    'custom website Sri Lanka',
    'Next.js developer Sri Lanka',
    'automation system Sri Lanka',
    'Colombo web developer',
    'custom coded website Sri Lanka',
  ],
  authors: [{ name: 'Spec Solutions', url: siteUrl }],
  creator: 'Spec Solutions',
  publisher: 'Spec Solutions',
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
    siteName: 'Spec Solutions',
    locale: 'en_LK',
    title: 'Custom Software Development for Businesses in Sri Lanka | Spec Solutions',
    description:
      'Spec Solutions builds custom web applications, booking systems, and automation tools for businesses in Sri Lanka. Custom-coded, Lighthouse 95+, no templates.',
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Spec Solutions — Custom Software for Sri Lankan Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development for Businesses in Sri Lanka | Spec Solutions',
    description:
      'Spec Solutions builds custom web applications, booking systems, and automation tools for businesses in Sri Lanka. Custom-coded, Lighthouse 95+, no templates.',
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
  },
}

export const viewport: Viewport = {
  themeColor: '#080C14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}
