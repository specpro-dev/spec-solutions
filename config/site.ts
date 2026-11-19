export const site = {
  name: 'CODELYNT',
  displayName: 'Codelynt',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://specsolutions.lk',
  title: 'CODELYNT — Build. Innovate. Transform.',
  description:
    'A modern technology company building AI-powered solutions and scalable digital products.',
  email: 'specprochat@gmail.com',
  whatsapp: {
    number: '94707386903',
    display: '+94 70 7386903',
    greeting: "Hi, I'm interested in a website for my institute/business.",
  },
  location: 'Kalutara & Colombo, Sri Lanka',
} as const

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}`
export const whatsappChatUrl = `${whatsappUrl}?text=${encodeURIComponent(site.whatsapp.greeting)}`

// Sections reachable by a clean URL (/services, /contact …). next.config rewrites
// exactly these paths to "/", so a link can only target one of them.
export const linkableSections = {
  services: 'Services',
  portfolio: 'Solutions',
  process: 'Process',
  team: 'About',
  contact: 'Contact',
} as const

export type SectionId = keyof typeof linkableSections

export const sectionIds = Object.keys(linkableSections) as SectionId[]

export const navSections: SectionId[] = ['services', 'portfolio', 'team']
