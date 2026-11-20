import type { Metadata, Viewport } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import GoogleAnalytics from '@/lib/analytics/GoogleAnalytics'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/layout/WhatsAppButton'
import { MotionProvider } from '@/components/ui/Reveal'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { site } from '@/config/site'
import { palettes } from '@/config/theme'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.displayName}` },
  description: site.description,
  keywords: [
    'custom software development',
    'business systems development',
    'AI integration services',
    'legacy system modernisation',
    'MVP and SaaS development',
    'software development company Sri Lanka',
    'offshore software development UK',
    site.displayName,
  ],
  authors: [{ name: site.displayName, url: site.url }],
  creator: site.displayName,
  publisher: site.displayName,
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
    canonical: site.url,
  },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    locale: 'en_US',
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
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
  themeColor: palettes.light['bg-base'],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={sora.variable}>
      <body>
        <SmoothScroll />
        <MotionProvider>
          <NavBar />
          {children}
          <Footer />
        </MotionProvider>
        <WhatsAppButton />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
