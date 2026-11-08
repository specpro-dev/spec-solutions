'use client'

import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

// HERO — text-first, no animation libraries, no raster images (LCP = the H1).
// The decorative symbol outline is inline SVG, aria-hidden.

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden min-h-[100svh] bg-bg-base"
      aria-label="Hero"
    >
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      {/* Large faint symbol outline with blue-cyan glow */}
      <svg
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[28rem] md:w-[40rem] lg:w-[46rem] opacity-30 md:opacity-40"
        viewBox="-4 -4 108 108"
        fill="none"
        aria-hidden="true"
        style={{ filter: 'drop-shadow(0 0 40px rgba(59,130,246,0.35))' }}
      >
        <defs>
          <linearGradient id="hero-sym" gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="90" y2="100">
            <stop offset="0" stopColor="#3B82F6" />
            <stop offset="1" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <path
          d="M0 32 L53 0 L100 26 L79.4 38 L53 23 L29 37.5 L29 62.5 L53 77 L79.4 62 L100 74 L53 100 L0 68 Z"
          stroke="url(#hero-sym)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <p className="eyebrow mb-6">Build · Innovate · Transform</p>

        {/* H1 — LCP element. No animation. */}
        <h1 className="font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-text-primary max-w-3xl">
          Turn Ideas Into <span className="text-gradient">Intelligent Solutions</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
          Custom software. AI-powered solutions. Real business impact.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href="/contact"
            id="hero-cta-primary"
            onClick={e => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              history.pushState(null, '', '/contact')
              trackEvent('cta_click', { label: 'hero_contact', location: 'hero' })
            }}
            className="btn btn-primary"
          >
            Get in Touch
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </a>

          <a
            href="/portfolio"
            id="hero-cta-secondary"
            onClick={e => {
              e.preventDefault()
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
              history.pushState(null, '', '/portfolio')
              trackEvent('cta_click', { label: 'hero_portfolio', location: 'hero' })
            }}
            className="btn btn-secondary"
          >
            View Our Work
          </a>
        </div>
      </div>
    </section>
  )
}
