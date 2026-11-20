export const site = {
  name: 'CODELYNT',
  displayName: 'Codelynt',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://specsolutions.lk',
  title: 'Codelynt | Custom software, AI and legacy modernisation',
  description:
    'A software engineering team in Sri Lanka. We build business systems, products and AI features for companies in the UK, Europe and Australia, and replace the old systems holding them back.',
  email: 'specprochat@gmail.com',
  whatsapp: {
    number: '94707386903',
    display: '+94 70 7386903',
    greeting: "Hi, I'd like to talk about a software project.",
  },
  location: 'Colombo, Sri Lanka',
} as const

export const whatsappUrl = `https://wa.me/${site.whatsapp.number}`
export const whatsappChatUrl = `${whatsappUrl}?text=${encodeURIComponent(site.whatsapp.greeting)}`

// Sections reachable by a clean URL (/services, /why-us …). next.config rewrites
// exactly these paths to "/", so a link can only target one of them.
export const linkableSections = {
  services: 'Services',
  'case-studies': 'Case studies',
  'why-us': 'Why us',
  process: 'Process',
} as const

export type SectionId = keyof typeof linkableSections

export const sectionIds = Object.keys(linkableSections) as SectionId[]

export const navSections: SectionId[] = ['services', 'case-studies', 'why-us']

// Company profiles shown in the footer. Leave a URL empty to hide that icon.
export const socialLinks = {
  linkedin: '',
  facebook: '',
  instagram: '',
} as const
