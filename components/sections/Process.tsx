import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    duration: '1 week',
    body: 'Working sessions with the people who will use the system, to map how work actually moves through your business.',
  },
  {
    number: '02',
    title: 'Specification',
    duration: '1–2 weeks',
    body: 'Every feature, screen, integration and data migration, written down. You sign it off and the price is fixed against it.',
  },
  {
    number: '03',
    title: 'Build',
    duration: '6–16 weeks',
    body: 'Two-week sprints, each ending in a working demo on a staging link your team can click through.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    duration: 'Ongoing',
    body: 'Deployed, data migrated, your team walked through it and the code handed over. We stay on for support if you want us to.',
  },
] as const

export default function Process() {
  return (
    <Section id="process" label="Process" tone="base">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:items-center mb-14 md:mb-20">
        <div className="[&>div]:mb-0">
          <SectionHeader
            eyebrow="Process"
            title="How We Work"
            lede="Four steps, with nothing hidden between them. The specification is the reference for every decision, and you sign it before we write any code."
          />
        </div>
        <Reveal>
          <div className="relative aspect-[3/2] overflow-hidden rounded-image border border-border-subtle bg-bg-surface">
            <Image
              src="/Process.png"
              alt="A hand signing a printed software specification with wireframes of mobile and web screens"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <RevealGroup as="ol" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        {STEPS.map(({ number, title, duration, body }) => (
          <RevealItem key={number} as="li" className="flex flex-col gap-3 pt-5 border-t border-text-primary">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-xs font-medium tracking-widest text-text-secondary">{number}</span>
              <span className="text-xs text-text-secondary">{duration}</span>
            </div>
            <h3 className="text-lg font-semibold leading-snug text-text-primary">{title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
