'use client'

import { useRef } from 'react'
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

// ─── Data ─────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number:      '01',
    title:       'Discovery',
    duration:    '1–2 days',
    body:        'One focused video call. We map your exact operation — who does what, when, and how. We do not start with wireframes. We start with your business process.',
    deliverable: 'A shared discovery document that captures your process, constraints, and definition of success.',
  },
  {
    number:      '02',
    title:       'Specification',
    duration:    '3–5 days',
    body:        'Before we write a line of code, you get a written technical specification — every feature, every screen, every integration. You read it, challenge it, and sign off. Then we build exactly that.',
    deliverable: 'A fixed-scope technical document. Your written guarantee of what gets built.',
  },
  {
    number:      '03',
    title:       'Build',
    duration:    '2–6 weeks',
    body:        'Two-week sprints. A working demo at the end of each one — not a status update, a system you can click through and test. Feedback happens here, while changes are cheap, not after launch.',
    deliverable: 'A production-ready application reviewed against your specification.',
  },
  {
    number:      '04',
    title:       'Launch & Handover',
    duration:    '1–2 days',
    body:        'We handle the deployment, the domain configuration, and the analytics setup. You receive a recorded system walkthrough your team can re-watch. The source code is yours.',
    deliverable: 'Live on Vercel Edge. Domain configured. Walkthrough video. Full source ownership.',
  },
] as const

// ─── Animation variants ────────────────────────────────────────────────────────
const stepsContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}

const stepVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const stepStatic = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }

// ─── Component ────────────────────────────────────────────────────────────────
export default function Process() {
  const prefersReduced = useReducedMotion()
  const timelineRef    = useRef<HTMLDivElement>(null)

  // Grow the gold line as the timeline scrolls into view
  const { scrollYProgress } = useScroll({
    target:  timelineRef,
    offset:  ['start 85%', 'end 35%'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  const scrollToContact = () => {
    trackEvent('cta_click', { label: 'process_start', location: 'process' })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', '/contact')
  }

  return (
    <section
      id="process"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            &lt; PROCESS /&gt;
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            How We Work
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Four steps. No black box. Your specification is the source of truth from day one — and you hold it.
          </p>
        </div>

        {/* Two-column layout: timeline left, CTA panel right */}
        <LazyMotion features={domAnimation}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* ── Left: vertical timeline ─────────────────────────────────── */}
            <div className="relative" ref={timelineRef}>

              {/* Static guide line — full height, gold-subtle */}
              <div
                className="absolute top-1.5 bottom-1.5 w-px pointer-events-none"
                style={{ left: '16px', backgroundColor: 'var(--border-subtle)' }}
                aria-hidden="true"
              />

              {/* Animated gold overlay — grows from top on scroll */}
              <m.div
                className="absolute top-1.5 w-px pointer-events-none origin-top"
                style={{
                  left:            '16px',
                  height:          'calc(100% - 0.375rem)',
                  backgroundColor: 'var(--accent)',
                  scaleY:          prefersReduced ? 1 : scaleY,
                }}
                aria-hidden="true"
              />

              <m.ol
                className="list-none m-0 p-0"
                variants={prefersReduced ? {} : stepsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-8%' }}
              >
                {STEPS.map(({ number, title, duration, body, deliverable }, index) => (
                  <m.li
                    key={number}
                    variants={prefersReduced ? stepStatic : stepVariant}
                    className={`relative flex gap-10 ${index < STEPS.length - 1 ? 'pb-14' : ''}`}
                  >
                    {/* Dot marker */}
                    <div
                      className="absolute top-1.5 w-3 h-3 rounded-full z-10 flex-shrink-0 border-2"
                      style={{
                        left:            '10px',
                        backgroundColor: 'var(--bg-surface)',
                        borderColor:     'var(--accent)',
                      }}
                      aria-hidden="true"
                    />

                    {/* Step number */}
                    <div className="flex-shrink-0 w-8 pt-0.5 pl-7">
                      <span
                        className="font-mono text-xs font-medium tracking-widest"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-jetbrains-mono)' }}
                      >
                        {number}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      {/* Title + duration */}
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3
                          className="text-lg font-semibold leading-snug"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {title}
                        </h3>
                        <span
                          className="font-mono text-xs flex-shrink-0"
                          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-jetbrains-mono)' }}
                        >
                          {duration}
                        </span>
                      </div>

                      {/* Body */}
                      <p
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {body}
                      </p>

                      {/* Deliverable */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: 'var(--accent)' }} aria-hidden="true">↳</span>
                        <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                          {deliverable}
                        </span>
                      </div>
                    </div>
                  </m.li>
                ))}
              </m.ol>
            </div>

            {/* ── Right: sticky CTA panel ─────────────────────────────────── */}
            <div className="lg:sticky lg:top-32">
              <m.div
                initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true, margin: '-8%' }}
                className="rounded-xl border overflow-hidden flex flex-col"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
              >
                {/* Top accent line — same pattern as service cards */}
                <div
                  className="h-px w-full flex-shrink-0"
                  style={{ background: 'linear-gradient(90deg, var(--accent) 0%, transparent 65%)' }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-6 p-8 flex-1">
                  <div>
                    <p
                      className="font-mono text-xs tracking-widest uppercase mb-3"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-jetbrains-mono)' }}
                    >
                      No Commitment Required
                    </p>
                    <h3
                      className="text-xl font-bold mb-3 leading-snug"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Start with a 30-minute discovery call.
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      We will tell you whether your project fits what we do — and if it does, you will leave with a clear picture of scope, timeline, and cost. No sales pitch.
                    </p>
                  </div>

                  <ul className="flex flex-col gap-3" aria-label="What to expect">
                    {[
                      'We map your process, not ours',
                      'You get a written spec before any code is written',
                      'Fixed-scope pricing — no surprise invoices',
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                          className="flex-shrink-0 mt-0.5" aria-hidden="true"
                        >
                          <path d="M2 7l3.5 3.5L12 3" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={scrollToContact}
                    className="w-full py-3.5 text-sm font-bold rounded-lg transition-colors duration-200"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--navy-dark)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-light)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent)' }}
                  >
                    Book a Discovery Call
                  </button>
                </div>
              </m.div>
            </div>

          </div>
        </LazyMotion>
      </div>
    </section>
  )
}
