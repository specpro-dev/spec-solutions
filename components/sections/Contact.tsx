'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
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

const FIELDS = [
  { id: 'name', label: 'Your name', type: 'text', autoComplete: 'name', placeholder: 'Jane Smith' },
  { id: 'businessName', label: 'Business name', type: 'text', autoComplete: 'organization', placeholder: 'Acme Ltd' },
  { id: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', placeholder: '+94 77 000 0000' },
] as const

const inputCls =
  'w-full min-h-[44px] bg-bg-card border border-[var(--border-subtle)] rounded-button px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent-light/60 transition-colors duration-200 aria-[invalid=true]:border-red-400'

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null
  return (
    <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400" role="alert">
      {msg}
    </p>
  )
}

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error'
  errorMessage: string
}

export default function Contact() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    errorMessage: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate(data: Record<string, string>) {
    const next: Record<string, string> = {}
    if (!data.name.trim()) next.name = 'Please enter your name.'
    if (!data.businessName.trim()) next.businessName = 'Please enter your business name.'
    if (!/^[+()\d\s-]{7,}$/.test(data.phone.trim())) next.phone = 'Please enter a valid phone number.'
    if (!data.goal) next.goal = 'Please choose a goal.'
    return next
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      businessName: (form.elements.namedItem('businessName') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      goal: (form.elements.namedItem('goal') as HTMLSelectElement).value,
    }

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setFormState({ status: 'idle', errorMessage: '' })
      ;(form.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus()
      return
    }
    setFormState({ status: 'loading', errorMessage: '' })

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
      setErrors({})
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setFormState({ status: 'error', errorMessage: message })
      trackEvent('form_submit', { label: 'contact_form', status: 'error' })
    }
  }

  return (
    <section id="contact" className="section-py relative bg-bg-surface" aria-label="Contact us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <MotionWrapper className="text-center mb-14">
          <p className="eyebrow mb-3">Get in touch</p>
          <h2 className="section-title">Book a free digital audit</h2>
          <p className="mt-4 text-text-secondary max-w-lg mx-auto">
            Tell us about your business and we&apos;ll come back within one business
            day with a frank assessment of where your digital presence stands
            and what&apos;s worth fixing first.
          </p>
        </MotionWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          {/* ─── Contact form ─────────────────────────────────────────── */}
          <MotionWrapper>
            <div className="card p-6 sm:p-8 hover:!transform-none hover:!shadow-none">
              {formState.status === 'success' && (
                <div role="status" className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 mb-6">
                  <CheckCircle2 size={18} strokeWidth={1.75} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-sm">We received your message!</p>
                    <p className="text-sm mt-0.5 text-emerald-300/80">We&apos;ll be in touch within one business day.</p>
                  </div>
                </div>
              )}

              {formState.status === 'error' && (
                <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 mb-6">
                  <AlertCircle size={18} strokeWidth={1.75} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-sm">Submission failed</p>
                    <p className="text-sm mt-0.5 text-red-300/90">{formState.errorMessage}</p>
                    <p className="text-sm mt-1 text-red-300/80">
                      You can also reach us directly at{' '}
                      <a href="mailto:specprochat@gmail.com" className="underline hover:text-red-200">
                        specprochat@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {FIELDS.map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-text-primary text-sm font-medium mb-1.5">
                      {f.label} <span className="text-accent-2" aria-hidden="true">*</span>
                    </label>
                    <input
                      id={f.id}
                      name={f.id}
                      type={f.type}
                      required
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      aria-invalid={errors[f.id] ? true : undefined}
                      aria-describedby={errors[f.id] ? `${f.id}-error` : undefined}
                      className={inputCls}
                    />
                    <FieldError id={f.id} msg={errors[f.id]} />
                  </div>
                ))}

                <div>
                  <label htmlFor="goal" className="block text-text-primary text-sm font-medium mb-1.5">
                    What&apos;s your primary goal? <span className="text-accent-2" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="goal"
                    name="goal"
                    required
                    defaultValue=""
                    aria-invalid={errors.goal ? true : undefined}
                    aria-describedby={errors.goal ? 'goal-error' : undefined}
                    className={`${inputCls} cursor-pointer`}
                  >
                    <option value="" disabled>Select an option...</option>
                    {GOALS.map((goal) => (
                      <option key={goal} value={goal}>{goal}</option>
                    ))}
                  </select>
                  <FieldError id="goal" msg={errors.goal} />
                </div>

                <button
                  type="submit"
                  id="contact-submit"
                  disabled={formState.status === 'loading'}
                  className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState.status === 'loading' ? (
                    <>
                      <Loader2 size={16} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    'Send Message — It\'s Free'
                  )}
                </button>

                <p className="text-text-secondary text-xs text-center">
                  No spam. We&apos;ll reply within one business day.
                </p>
              </form>
            </div>
          </MotionWrapper>

          {/* ─── Direct contact info ───────────────────────────────────── */}
          <MotionWrapper delay={0.15}>
            <div className="space-y-6">
              <h3 className="text-text-primary font-semibold text-lg mb-5">Or reach us directly</h3>

              <div className="flex items-start gap-4">
                <div className="icon-tile"><Mail size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                <div>
                  <p className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-0.5">Email</p>
                  <a href="mailto:specprochat@gmail.com" className="text-text-primary text-sm hover:text-accent-light transition-colors duration-200">
                    specprochat@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="icon-tile"><Phone size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                <div>
                  <p className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-0.5">Phone / WhatsApp</p>
                  <a
                    href="https://wa.me/94707386903"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary text-sm hover:text-accent-light transition-colors duration-200"
                  >
                    +94 70 7386903
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="icon-tile"><MapPin size={20} strokeWidth={1.75} aria-hidden="true" /></div>
                <div>
                  <p className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-0.5">Location</p>
                  <p className="text-text-primary text-sm">Kalutara &amp; Colombo, Sri Lanka</p>
                  <p className="text-text-secondary text-xs mt-0.5">We work with clients island-wide, fully remote.</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-card border border-[var(--border-subtle)] bg-bg-card">
                <p className="text-text-secondary text-sm">
                  <span className="text-accent-light font-semibold">Typical response time:</span>{' '}
                  within one business day. We don&apos;t have a sales team — you&apos;ll
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
