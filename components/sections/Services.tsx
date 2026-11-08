'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'
import { Globe, Zap, SearchCheck } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const PortalIcon = Globe
const AutomationIcon = Zap
const AuditIcon = SearchCheck

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id:      'web-app',
    trackId: 'web_app',
    number:  '01',
    Icon:    PortalIcon,
    outcome: 'A digital front door that works while you sleep.',
    heading: 'Web Applications',
    body:    'Your business stops at 6 PM. Your website should not. We build registration portals, booking systems, and inquiry platforms coded precisely to your process — not adapted from a WordPress theme purchased for $49.',
    fit:     ['Education Institutes', 'Clinics & Practices', 'Property Agencies'],
  },
  {
    id:      'automation',
    trackId: 'automation',
    number:  '02',
    Icon:    AutomationIcon,
    outcome: 'Follow up in seconds. Confirm in minutes.',
    heading: 'Automation Systems',
    body:    'Every lead you follow up manually is a lead that could have been nurtured automatically. We build the pipelines — inquiry, appointment, payment — that respond before your competitor even sees the notification.',
    fit:     ['Lead-Driven Businesses', 'Appointment Practices', 'E-commerce Operations'],
  },
  {
    id:      'audit',
    trackId: 'audit',
    number:  '03',
    Icon:    AuditIcon,
    outcome: 'Find out exactly what is costing you conversions.',
    heading: 'Performance Audits',
    body:    'Slow load time. Broken mobile layout. A form that fails on Safari. Any one of these kills the sale. We audit with Lighthouse, session data, and manual testing — and hand you a prioritised fix list, not a report you will shelve.',
    fit:     ['Sites with Low Conversion', 'Ad-Supported Businesses'],
  },
] as const

// ─── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const card = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

const cardStatic = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }

// ─── Component ────────────────────────────────────────────────────────────────
export default function Services() {
  const prefersReduced = useReducedMotion()
  const cardVariant    = prefersReduced ? cardStatic : card

  const scrollToContact = (trackId: string) => {
    trackEvent('service_click', { service: trackId })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', '/contact')
  }

  return (
    <section
      id="services"
      className="section-py"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4">Services</p>
          <h2 className="section-title mb-4">
            What We Build
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Every engagement starts with your specification. We engineer to it — no templates, no guesswork.
          </p>
        </div>

        {/* Card grid */}
        <LazyMotion features={domAnimation}>
          <m.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={prefersReduced ? {} : container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
          >
            {SERVICES.map(({ id, Icon, number, outcome, heading, body, fit, trackId }) => (
              <m.article
                key={id}
                variants={cardVariant}
                className="card group relative flex flex-col overflow-hidden"
              >
                {/* Top accent line — fades right */}
                <div
                  className="h-px w-full flex-shrink-0"
                  style={{ background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 35%, transparent 70%)' }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-5 p-8 flex-1">

                  {/* Number (watermark) + icon */}
                  <div className="flex items-start justify-between">
                    <span
                      className="text-4xl font-bold leading-none select-none"
                      style={{ color: 'rgba(59, 130, 246, 0.22)' }}
                      aria-hidden="true"
                    >
                      {number}
                    </span>
                    <div className="icon-tile">
                      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                    </div>
                  </div>

                  {/* Outcome — what the client actually gets */}
                  <p
                    className="text-sm font-semibold leading-snug"
                    style={{ color: 'var(--accent-2)' }}
                  >
                    {outcome}
                  </p>

                  {/* Service name + narrative body */}
                  <div className="flex flex-col gap-3 flex-1">
                    <h3
                      className="text-lg font-bold leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {heading}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {body}
                    </p>
                  </div>

                  {/* Industry fit tags */}
                  <div className="flex flex-wrap gap-2">
                    {fit.map(tag => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md"
                        style={{
                          backgroundColor: 'rgba(59, 130, 246, 0.08)',
                          color:           'var(--text-secondary)',
                          border:          '1px solid var(--border-subtle)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Ghost CTA */}
                  <button
                    onClick={() => scrollToContact(trackId)}
                    className="group/link flex items-center gap-1.5 text-sm font-medium w-fit min-h-[44px] cursor-pointer transition-colors duration-200"
                    style={{ color: 'var(--accent-light)' }}
                    aria-label={`Discuss ${heading} with us`}
                  >
                    Discuss this
                    <span className="transition-transform duration-200 group-hover/link:translate-x-0.5 inline-block">
                      →
                    </span>
                  </button>
                </div>
              </m.article>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  )
}
