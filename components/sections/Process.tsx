import { Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import SectionLink from '@/components/ui/SectionLink'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import ScrollProgressLine from './ScrollProgressLine'

const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    duration: '1–2 days',
    body: 'One focused video call. We map your exact operation — who does what, when, and how. We do not start with wireframes. We start with your business process.',
    deliverable: 'A shared discovery document that captures your process, constraints, and definition of success.',
  },
  {
    number: '02',
    title: 'Specification',
    duration: '3–5 days',
    body: 'Before we write a line of code, you get a written technical specification — every feature, every screen, every integration. You read it, challenge it, and sign off. Then we build exactly that.',
    deliverable: 'A fixed-scope technical document. Your written guarantee of what gets built.',
  },
  {
    number: '03',
    title: 'Build',
    duration: '2–6 weeks',
    body: 'Two-week sprints. A working demo at the end of each one — not a status update, a system you can click through and test. Feedback happens here, while changes are cheap, not after launch.',
    deliverable: 'A production-ready application reviewed against your specification.',
  },
  {
    number: '04',
    title: 'Launch & Handover',
    duration: '1–2 days',
    body: 'We handle the deployment, the domain configuration, and the analytics setup. You receive a recorded system walkthrough your team can re-watch. The source code is yours.',
    deliverable: 'Live on Vercel Edge. Domain configured. Walkthrough video. Full source ownership.',
  },
] as const

const EXPECTATIONS = [
  'We map your process, not ours',
  'You get a written spec before any code is written',
  'Fixed-scope pricing — no surprise invoices',
]

export default function Process() {
  return (
    <Section id="process" label="Process" tone="surface">
      <SectionHeader
        eyebrow="Process"
        title="How We Work"
        lede="Four steps. No black box. Your specification is the source of truth from day one — and you hold it."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ScrollProgressLine>
          <RevealGroup as="ol">
            {STEPS.map(({ number, title, duration, body, deliverable }) => (
              <RevealItem key={number} as="li" className="relative flex gap-10 pb-14 last:pb-0">
                <div
                  className="absolute top-1.5 left-[10px] w-3 h-3 rounded-full z-10 border-2 bg-bg-surface border-accent"
                  aria-hidden="true"
                />

                <div className="flex-shrink-0 w-8 pt-0.5 pl-7">
                  <span className="text-xs font-medium tracking-widest text-accent-light">{number}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h3 className="text-lg font-semibold leading-snug text-text-primary">{title}</h3>
                    <span className="text-xs flex-shrink-0 text-text-secondary">{duration}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-3 text-text-secondary">{body}</p>
                  <div className="flex items-start gap-2">
                    <span className="text-xs flex-shrink-0 mt-0.5 text-accent" aria-hidden="true">
                      ↳
                    </span>
                    <span className="text-xs leading-relaxed text-text-secondary">{deliverable}</span>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </ScrollProgressLine>

        <div className="lg:sticky lg:top-32">
          <Reveal className="card card-interactive overflow-hidden flex flex-col">
            <div className="card-accent-line" aria-hidden="true" />

            <div className="flex flex-col gap-6 p-8 flex-1">
              <div>
                <p className="text-xs tracking-widest uppercase mb-3 text-accent-light">No Commitment Required</p>
                <h3 className="text-xl font-bold mb-3 leading-snug text-text-primary">
                  Start with a 30-minute discovery call.
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  We will tell you whether your project fits what we do — and if it does, you will leave with a clear
                  picture of scope, timeline, and cost. No sales pitch.
                </p>
              </div>

              <ul className="flex flex-col gap-3" aria-label="What to expect">
                {EXPECTATIONS.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check size={14} strokeWidth={1.75} className="flex-shrink-0 mt-0.5 text-accent-2" aria-hidden="true" />
                    <span className="text-sm text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>

              <SectionLink
                to="contact"
                track={{ event: 'cta_click', params: { label: 'process_start', location: 'process' } }}
                className="btn btn-primary w-full"
              >
                Get in Touch
              </SectionLink>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
