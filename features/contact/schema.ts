import { services } from '@/features/services/data'

export const GOALS: readonly string[] = [...services.map(s => s.goal), 'Something else']

// What the form collects. `collected` is how the privacy policy lists each one.
export const FIELDS = {
  name: { label: 'Your name', collected: 'Your name', required: 'Please enter your name.' },
  businessName: { label: 'Company', collected: 'Your business name', required: 'Please enter your company name.' },
  phone: { label: 'Phone number', collected: 'Your phone number', required: 'Please enter a valid phone number.' },
  goal: { label: 'What do you need?', collected: 'The goal you choose', required: 'Please choose one.' },
} as const

export type ContactField = keyof typeof FIELDS
export type ContactLead = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

const isValid: Record<ContactField, (v: string) => boolean> = {
  name: v => v.length > 0,
  businessName: v => v.length > 0,
  phone: v => /^[+()\d\s-]{7,}$/.test(v),
  goal: v => GOALS.includes(v),
}

/** Same rules on the client (inline errors) and the API route (rejects bad requests). */
export function parseLead(input: unknown): { lead: ContactLead; errors: ContactErrors } {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const lead = {} as ContactLead
  const errors: ContactErrors = {}
  for (const field of Object.keys(FIELDS) as ContactField[]) {
    const value = typeof raw[field] === 'string' ? (raw[field] as string).trim() : ''
    lead[field] = value
    if (!isValid[field](value)) errors[field] = FIELDS[field].required
  }
  return { lead, errors }
}
