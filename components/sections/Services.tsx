import { ArrowRight, Globe, Zap, SearchCheck } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionLink from '@/components/ui/SectionLink'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

const SERVICES = [
  {
    id: 'web_app',
    number: '01',
    Icon: Globe,
    outcome: 'A digital front door that works while you sleep.',
    heading: 'Web Applications',
    body: 'Your business stops at 6 PM. Your website should not. We build registration portals, booking systems, and inquiry platforms coded precisely to your process — not adapted from a WordPress theme purchased for $49.',
    fit: ['Education Institutes', 'Clinics & Practices', 'Property Agencies'],
  },
  {
    id: 'automation',
    number: '02',
    Icon: Zap,
    outcome: 'Follow up in seconds. Confirm in minutes.',
    heading: 'Automation Systems',
    body: 'Every lead you follow up manually is a lead that could have been nurtured automatically. We build the pipelines — inquiry, appointment, payment — that respond before your competitor even sees the notification.',
    fit: ['Lead-Driven Businesses', 'Appointment Practices', 'E-commerce Operations'],
  },
  {
    id: 'audit',
    number: '03',
    Icon: SearchCheck,
    outcome: 'Find out exactly what is costing you conversions.',
    heading: 'Performance Audits',
    body: 'Slow load time. Broken mobile layout. A form that fails on Safari. Any one of these kills the sale. We audit with Lighthouse, session data, and manual testing — and hand you a prioritised fix list, not a report you will shelve.',
    fit: ['Sites with Low Conversion', 'Ad-Supported Businesses'],
  },
] as const

export default function Services() {
  return (
    <Section id="services" label="Services" tone="surface">
      <SectionHeader
        eyebrow="Services"
        title="What We Build"
        lede="Every engagement starts with your specification. We engineer to it — no templates, no guesswork."
      />

      <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SERVICES.map(({ id, Icon, number, outcome, heading, body, fit }) => (
          <RevealItem key={id} as="article" className="card card-interactive group relative flex flex-col overflow-hidden">
            <div className="flex flex-col gap-5 p-8 flex-1">
              <div className="flex items-start justify-between">
                <span className="text-4xl font-bold leading-none select-none text-border-strong" aria-hidden="true">
                  {number}
                </span>
                <div className="icon-tile">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </div>
              </div>

              <p className="text-sm font-medium leading-snug text-text-secondary">{outcome}</p>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-bold leading-snug text-text-primary">{heading}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {fit.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-md bg-bg-surface text-text-secondary border border-border-subtle"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <SectionLink
                to="contact"
                track={{ event: 'service_click', params: { service: id } }}
                className="group/link flex items-center gap-1.5 text-sm font-medium w-fit min-h-[44px] text-text-primary hover:text-accent-text transition-colors duration-200"
              >
                Discuss this<span className="sr-only"> {heading}</span>
                <ArrowRight size={16} strokeWidth={1.75} className="transition-transform duration-200 group-hover/link:translate-x-0.5" aria-hidden="true" />
              </SectionLink>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
