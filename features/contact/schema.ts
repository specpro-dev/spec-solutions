export const GOALS = [
  'Get more student registrations',
  'Automate appointment bookings',
  'Upgrade my current site',
  'Something else',
] as const

export const FIELDS = {
  name: { label: 'Your name', required: 'Please enter your name.' },
  businessName: { label: 'Business name', required: 'Please enter your business name.' },
  phone: { label: 'Phone number', required: 'Please enter a valid phone number.' },
  goal: { label: 'Goal', required: 'Please choose a goal.' },
} as const

export type ContactField = keyof typeof FIELDS
export type ContactLead = Record<ContactField, string>
export type ContactErrors = Partial<Record<ContactField, string>>

const isValid: Record<ContactField, (v: string) => boolean> = {
  name: v => v.length > 0,
  businessName: v => v.length > 0,
  phone: v => /^[+()\d\s-]{7,}$/.test(v),
  goal: v => (GOALS as readonly string[]).includes(v),
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
