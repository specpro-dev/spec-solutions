import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

const MEMBERS = [
  {
    initials: 'NU',
    name: 'Nashan Unais',
    role: 'Co-Founder & Frontend Engineer',
    credential:
      'Builds production web applications with React and Next.js — focused on clean architecture, TypeScript, and interfaces that perform under real load. Software Engineer at Intervest Software Technologies. BSc Computer Science, University of Westminster (via IIT Sri Lanka).',
    linkedIn: 'https://www.linkedin.com/in/nashan-unais/',
    portfolio: 'https://nashanunais.vercel.app/',
  },
  {
    initials: 'AF',
    name: 'Ashfaq Farleen',
    role: 'Co-Founder & Full Stack Engineer',
    credential:
      'Full-stack engineer across React, Node.js, Spring Boot, and .NET — with hands-on experience in automation pipelines, backend services, and freelance delivery. Software Engineer at Aventude. BSc Computer Science, IIT Sri Lanka.',
    linkedIn: 'https://www.linkedin.com/in/ashfaq-farleen/',
    portfolio: 'https://ashfaqfarleen.vercel.app/',
  },
  {
    initials: 'MA',
    name: 'Mohamed Ali Althaf Mohamed',
    role: 'Software Engineer',
    credential:
      'ML/computer vision researcher — PyTorch, TensorFlow, React, Node.js. BSc (Hons) Computer Science, University of Westminster (First Class).',
    linkedIn: 'https://www.linkedin.com/in/althaf-ali-dev',
    portfolio: 'https://althafali.vercel.app/',
  },
  {
    initials: 'SM',
    name: 'Saleem Malik',
    role: 'Software Engineer',
    credential:
      'Full-stack engineer across Angular, React, Django, Node.js, with applied post-quantum cryptography research. BSc (Hons) Computer Science, University of Westminster.',
    linkedIn: 'https://linkedin.com/in/saleemSE',
    portfolio: 'https://github.com/saleemsgit',
  },
] as const

// lucide-react no longer ships brand icons.
function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3.5 5.5v5M3.5 3.5v.01M6 5.5v5M6 7.5a2 2 0 0 1 4 0v3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const linkCls =
  'inline-flex items-center gap-1.5 text-xs font-medium min-h-[44px] text-text-secondary hover:text-text-primary transition-colors duration-200'

export default function Team() {
  return (
    <Section id="team" label="Our team" tone="base">
      <SectionHeader
        eyebrow="Team"
        title="The Team"
        lede="One goal: software that does exactly what it was built to do."
      />

      <RevealGroup className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
        {MEMBERS.map(({ initials, name, role, credential, linkedIn, portfolio }) => (
          <RevealItem key={name} className="card card-interactive overflow-hidden flex flex-col">
            <div className="flex flex-col gap-5 p-7">
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 bg-accent-strong"
                  aria-hidden="true"
                >
                  <span className="text-lg font-bold select-none text-white">{initials}</span>
                </div>
                <div>
                  <p className="font-bold text-base leading-snug text-text-primary">{name}</p>
                  <p className="text-sm font-medium mt-0.5 text-accent-text">{role}</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">{credential}</p>

              <div className="flex items-center gap-4 pt-1">
                <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label={`${name} on LinkedIn`}>
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <span className="text-border-subtle">·</span>
                <a href={portfolio} target="_blank" rel="noopener noreferrer" className={linkCls} aria-label={`${name}'s portfolio`}>
                  <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
                  Portfolio
                </a>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
