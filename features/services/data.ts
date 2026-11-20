// What we offer. The Services section, the footer, the contact form's "What do you
// need?" options and each case study's service tags all read from this list.
export const services = [
  {
    id: 'business_systems',
    heading: 'Business Systems',
    outcome: 'Replace the spreadsheets your operations run on.',
    body: 'Order management, customer portals, scheduling, stock and reporting, built around how your team actually works and connected to the tools you already pay for.',
    fit: ['Operations-heavy SMEs', 'Distributors & wholesalers', 'Multi-site service firms'],
    goal: 'Build a business system',
  },
  {
    id: 'ai_integration',
    heading: 'AI Integration',
    outcome: 'AI that does a real job inside the tools you already use.',
    body: 'Document extraction, support triage, quote drafting and search across your own data, with the review steps you need before anything reaches a customer.',
    fit: ['Document-heavy back offices', 'Support teams', 'Companies sitting on years of data'],
    goal: 'Add AI to our workflows',
  },
  {
    id: 'legacy_modernisation',
    heading: 'Legacy Modernisation',
    outcome: 'Get off the system nobody wants to touch.',
    body: 'We work out what your old system really does, put an API in front of it, and replace it piece by piece so the business keeps running while it changes.',
    fit: ['Ageing in-house systems', 'Access, Excel & VB apps', 'Platforms blocking new work'],
    goal: 'Replace or modernise a legacy system',
  },
  {
    id: 'products',
    heading: 'Products & SaaS',
    outcome: 'From first spec to paying customers.',
    body: 'MVPs and customer-facing products for funded founders, built by the same engineers who keep working on them after launch.',
    fit: ['Seed & Series A startups', 'Companies launching a new product line'],
    goal: 'Build a new product or MVP',
  },
] as const

export type ServiceId = (typeof services)[number]['id']

export function serviceHeading(id: ServiceId) {
  return services.find(s => s.id === id)!.heading
}
