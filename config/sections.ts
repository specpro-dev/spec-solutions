// Home page sections reachable by a clean URL (/services, /why-us …). next.config
// rewrites exactly these paths to "/", <Section id> only accepts these ids, and
// <SectionScroll> scrolls to the one in the URL when the page loads.
export const sections = {
  services: 'Services',
  'case-studies': 'Case studies',
  'why-us': 'Why us',
  process: 'Process',
} as const

export type SectionId = keyof typeof sections

export const sectionIds = Object.keys(sections) as SectionId[]

export const navSections: SectionId[] = ['services', 'case-studies', 'why-us']

export function sectionFromPath(pathname: string): SectionId | null {
  const id = pathname.slice(1)
  return id in sections ? (id as SectionId) : null
}

export function isHomePath(pathname: string) {
  return pathname === '/' || sectionFromPath(pathname) !== null
}
