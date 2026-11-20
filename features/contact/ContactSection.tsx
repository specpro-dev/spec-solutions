'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, type LucideIcon } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { site, whatsappUrl } from '@/config/site'
import { trackEvent } from '@/lib/analytics'
import { FIELDS, GOALS, parseLead, type ContactErrors, type ContactField } from './schema'

const INPUTS = [
  { id: 'name', type: 'text', autoComplete: 'name', placeholder: 'Jane Smith' },
  { id: 'businessName', type: 'text', autoComplete: 'organization', placeholder: 'Acme Ltd' },
  { id: 'phone', type: 'tel', autoComplete: 'tel', placeholder: '+44 20 7946 0000' },
] as const satisfies readonly { id: ContactField; [k: string]: string }[]

const inputCls =
  'w-full min-h-[44px] bg-bg-card border border-border-subtle rounded-button px-4 py-3 text-text-primary placeholder:text-text-muted text-sm focus:outline-none focus:border-text-primary focus:ring-2 focus:ring-accent/40 transition-colors duration-200 aria-[invalid=true]:border-red-600'

type Status = { kind: 'idle' | 'loading' | 'success' } | { kind: 'error'; message: string }

const FALLBACK_ERROR = 'Something went wrong. Please try again.'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: ContactField
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-text-primary text-sm font-medium mb-1.5">
        {label} <span className="text-accent-text" aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const errorProps = (id: ContactField, errors: ContactErrors) =>
  errors[id] ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {}

function ContactRow({ Icon, label, children }: { Icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="icon-tile">
        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
      </div>
      <div>
        <p className="text-text-secondary text-xs font-medium uppercase tracking-wider mb-0.5">{label}</p>
        {children}
      </div>
    </div>
  )
}

export default function ContactSection() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [errors, setErrors] = useState<ContactErrors>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const { lead, errors: found } = parseLead(Object.fromEntries(new FormData(form)))
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'idle' })
      ;(form.elements.namedItem(Object.keys(found)[0]) as HTMLElement | null)?.focus()
      return
    }
    setStatus({ kind: 'loading' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || json.error) throw new Error(json.error || FALLBACK_ERROR)

      setStatus({ kind: 'success' })
      trackEvent('form_submit', { label: 'contact_form', status: 'success' })
      form.reset()
    } catch (err) {
      setStatus({ kind: 'error', message: err instanceof Error ? err.message : FALLBACK_ERROR })
      trackEvent('form_submit', { label: 'contact_form', status: 'error' })
    }
  }

  return (
    <Section id="contact" label="Contact us" tone="surface">
      <SectionHeader
        align="center"
        level="h1"
        eyebrow="Get in touch"
        title="Tell us about your project"
        lede="A few details are enough to start. We'll reply within one business day to set up a call, and if we're not the right fit we'll tell you."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
        <Reveal>
          <div className="card p-6 sm:p-8">
            {status.kind === 'success' && (
              <div
                role="status"
                className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 mb-6"
              >
                <CheckCircle2 size={18} strokeWidth={1.75} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm">We received your message!</p>
                  <p className="text-sm mt-0.5 text-emerald-700">We&apos;ll be in touch within one business day.</p>
                </div>
              </div>
            )}

            {status.kind === 'error' && (
              <div role="alert" className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 mb-6">
                <AlertCircle size={18} strokeWidth={1.75} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm">Submission failed</p>
                  <p className="text-sm mt-0.5 text-red-700">{status.message}</p>
                  <p className="text-sm mt-1 text-red-700">
                    You can also reach us directly at{' '}
                    <a href={`mailto:${site.email}`} className="underline hover:text-red-900">
                      {site.email}
                    </a>
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {INPUTS.map(input => (
                <Field key={input.id} id={input.id} label={FIELDS[input.id].label} error={errors[input.id]}>
                  <input {...input} name={input.id} required className={inputCls} {...errorProps(input.id, errors)} />
                </Field>
              ))}

              <Field id="goal" label="What do you need?" error={errors.goal}>
                <select
                  id="goal"
                  name="goal"
                  required
                  defaultValue=""
                  className={`${inputCls} cursor-pointer`}
                  {...errorProps('goal', errors)}
                >
                  <option value="" disabled>
                    Select an option...
                  </option>
                  {GOALS.map(goal => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </Field>

              <button
                type="submit"
                id="contact-submit"
                disabled={status.kind === 'loading'}
                className="btn btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status.kind === 'loading' ? (
                  <>
                    <Loader2 size={16} strokeWidth={1.75} className="animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </button>

              <p className="text-text-secondary text-xs text-center">No spam. We&apos;ll reply within one business day.</p>
            </form>
          </div>
        </Reveal>

        <Reveal className="space-y-6">
          <h3 className="text-text-primary font-semibold text-lg mb-5">Or reach us directly</h3>

          <ContactRow Icon={Mail} label="Email">
            <a
              href={`mailto:${site.email}`}
              className="text-text-primary text-sm text-link"
            >
              {site.email}
            </a>
          </ContactRow>

          <ContactRow Icon={Phone} label="Phone / WhatsApp">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary text-sm text-link"
            >
              {site.whatsapp.display}
            </a>
          </ContactRow>

          <ContactRow Icon={MapPin} label="Location">
            <p className="text-text-primary text-sm">{site.location}</p>
            <p className="text-text-secondary text-xs mt-0.5">Working remotely with clients in the UK, Europe, Australia and Sri Lanka.</p>
          </ContactRow>

          <div className="mt-6 p-4 rounded-card border border-border-subtle bg-bg-card">
            <p className="text-text-secondary text-sm">
              <span className="text-text-primary font-semibold">Typical response time:</span> within one business day.
              There&apos;s no sales team. You&apos;ll hear directly from one of the founders.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
