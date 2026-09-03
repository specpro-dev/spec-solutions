'use client'

import { useState } from 'react'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { trackEvent } from '@/lib/analytics'

// CONTACT / LEAD CAPTURE SECTION
//
// Form submits to /api/contact which delivers via Resend.
// Success state and error state are both explicit and visible to the user.
// Silent failures are NOT acceptable — every lead that submits must either
// get a confirmation or an actionable error message.

const GOALS = [
  'Get more student registrations',
  'Automate appointment bookings',
  'Upgrade my current site',
  'Something else',
]

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  errorMessage: string
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    errorMessage: '',
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState({ status: 'loading', errorMessage: '' })

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      businessName: (form.elements.namedItem('businessName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      goal: (form.elements.namedItem('goal') as HTMLSelectElement).value,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok || json.error) {
        throw new Error(json.error || 'Something went wrong. Please try again.')
      }

      setFormState({ status: 'success', errorMessage: '' })
      trackEvent('form_submit', { label: 'contact_form', status: 'success' })
      form.reset()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setFormState({ status: 'error', errorMessage: message })
      trackEvent('form_submit', { label: 'contact_form', status: 'error' })
    }
  }

  return (
    <section
      id="contact"
      className="section-padding bg-navy"
      aria-label="Contact us"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <MotionWrapper className="text-center mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Get in touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Book a free digital audit
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            Tell us about your business and we'll come back within one business
            day with a frank assessment of where your digital presence stands
            and what's worth fixing first.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          {/* ─── Contact form ─────────────────────────────────────────── */}
          <MotionWrapper>
            <div className="bg-navy-light/40 rounded-2xl border border-white/8 p-6 sm:p-8">
              {/* Success state */}
              {formState.status === 'success' && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 mb-6"
                >
                  <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M3 9l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">We received your message!</p>
                    <p className="text-sm mt-0.5 text-green-400/80">
                      We'll be in touch within one business day.
                    </p>
                  </div>
                </div>
              )}

              {/* Error state */}
              {formState.status === 'error' && (
                <div
                  role="alert"
                  className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 mb-6"
                >
                  <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M9 6v4M9 12.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <div>
                    <p className="font-semibold text-sm">Submission failed</p>
                    <p className="text-sm mt-0.5 text-red-400/80">{formState.errorMessage}</p>
                    <p className="text-sm mt-1 text-red-400/60">
                      You can also reach us directly at{' '}
                      <a href="mailto:specprochat@gmail.com" className="underline hover:text-red-400">
                        specprochat@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white text-sm font-medium mb-1.5"
                  >
                    Your name <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Ashan Perera"
                    className="w-full bg-navy border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors duration-200"
                  />
                </div>

                {/* Business name */}
                <div>
                  <label
                    htmlFor="businessName"
                    className="block text-white text-sm font-medium mb-1.5"
                  >
                    Business name <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    autoComplete="organization"
                    placeholder="Colombo Academy of Business"
                    className="w-full bg-navy border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white text-sm font-medium mb-1.5"
                  >
                    Phone number <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="+94 77 000 0000"
                    className="w-full bg-navy border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors duration-200"
                  />
                </div>

                {/* Goal dropdown */}
                <div>
                  <label
                    htmlFor="goal"
                    className="block text-white text-sm font-medium mb-1.5"
                  >
                    What's your primary goal? <span className="text-gold" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    required
                    defaultValue=""
                    className="w-full bg-navy border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors duration-200 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-white/30">
                      Select an option...
                    </option>
                    {GOALS.map((goal) => (
                      <option key={goal} value={goal} className="bg-navy">
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  id="contact-submit"
                  disabled={formState.status === 'loading'}
                  className="w-full bg-gold hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed text-navy font-bold text-sm px-6 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  {formState.status === 'loading' ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3"/>
                        <path d="M8 2a6 6 0 0 1 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message — It\'s Free'
                  )}
                </button>

                <p className="text-white/30 text-xs text-center">
                  No spam. We'll reply within one business day.
                </p>
              </form>
            </div>
          </MotionWrapper>

          {/* ─── Direct contact info ───────────────────────────────────── */}
          <MotionWrapper delay={0.15}>
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-5">
                  Or reach us directly
                </h3>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="2" y="4" width="14" height="10" rx="2" stroke="#C9963A" strokeWidth="1.2"/>
                    <path d="M2 7l7 4.5L16 7" stroke="#C9963A" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5">
                    Email
                  </p>
                  <a
                    href="mailto:specprochat@gmail.com"
                    className="text-white text-sm hover:text-gold transition-colors duration-200"
                  >
                    specprochat@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M5 2h2.5l1.5 4-2 1.5a9.5 9.5 0 0 0 3.5 3.5L12 9l4 1.5V13a2 2 0 0 1-2 2C6.477 15 3 8.523 3 4a2 2 0 0 1 2-2Z" stroke="#C9963A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5">
                    Phone / WhatsApp
                  </p>
                  <a
                    href="https://wa.me/94707386903"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm hover:text-gold transition-colors duration-200"
                  >
                    +94 70 7386903
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M9 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 0 1 5-5Z" stroke="#C9963A" strokeWidth="1.2"/>
                    <circle cx="9" cy="7" r="1.5" stroke="#C9963A" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white/50 text-xs font-medium uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-white text-sm">
                    Kalutara &amp; Colombo, Sri Lanka
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">
                    We work with clients island-wide, fully remote.
                  </p>
                </div>
              </div>

              {/* Response time badge */}
              <div className="mt-6 p-4 rounded-xl border border-white/8 bg-navy-light/30">
                <p className="text-white/70 text-sm">
                  <span className="text-gold font-semibold">Typical response time:</span>{' '}
                  within one business day. We don't have a sales team — you'll
                  hear directly from one of the founders.
                </p>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  )
}
