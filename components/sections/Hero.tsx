'use client'

import { trackEvent } from '@/lib/analytics'

// HERO SECTION
//
// Performance rules applied here:
// ─ NO Framer Motion on any element in this section.
//   The headline is the LCP element. Any animation delay (even 100ms) tanks the
//   Lighthouse performance score because LCP is measured from navigation start.
//   The text renders instantly, no fade-in, no slide-up.
// ─ Background is a CSS gradient (zero network cost, zero layout shift).
// ─ CTAs use anchor links to in-page sections (no route change).

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, #162147 0%, #090F22 70%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle dot grid texture */}
      <div
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle, #C9963A 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-32 text-center">
        {/* Eyebrow label */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span className="text-gold text-xs font-semibold tracking-widest uppercase">
            Sri Lanka — Kalutara &amp; Colombo
          </span>
        </div>

        {/* H1 — this is the LCP element. No animation. Renders immediately. */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight max-w-4xl mx-auto">
          We build digital infrastructure that{' '}
          <span className="text-gold">drives student registrations</span> and
          automates your business.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Custom-coded websites and automation systems for education institutes
          and appointment-based service businesses in Sri Lanka.
        </p>

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/contact"
            id="hero-cta-primary"
            onClick={e => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              history.pushState(null, '', '/contact')
              trackEvent('cta_click', {
                label: 'hero_audit',
                location: 'hero',
              })
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold text-base px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-gold/20"
          >
            Book a Free Digital Audit
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="/portfolio"
            id="hero-cta-secondary"
            onClick={e => {
              e.preventDefault()
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
              history.pushState(null, '', '/portfolio')
              trackEvent('cta_click', {
                label: 'hero_portfolio',
                location: 'hero',
              })
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors duration-200 hover:bg-white/5"
          >
            View Our Work
          </a>
        </div>

        {/* Trust indicators — text only, no fabricated numbers */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-white/40 text-sm">
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505z" fill="#C9963A"/>
            </svg>
            Custom-coded, not templates
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505z" fill="#C9963A"/>
            </svg>
            Built for speed &amp; Lighthouse 95+
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.43L7 8.885l-3.09 1.615.59-3.43L2 4.635l3.455-.505z" fill="#C9963A"/>
            </svg>
            Deployed on Vercel edge network
          </span>
        </div>
      </div>
    </section>
  )
}
