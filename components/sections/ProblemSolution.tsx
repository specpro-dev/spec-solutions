import { Clock, MonitorSmartphone, Gauge } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

// Only patterns a business owner can verify themselves; no made-up statistics.

const problems = [
  {
    Icon: Clock,
    heading: 'After-hours inquiries go unanswered',
    body: "A Facebook page can't take a booking at 11 PM when a parent is researching class options for their child. Without a website and an intake form, those inquiries move on to whoever picks up next.",
    solution: 'An always-on website captures leads and appointments 24/7 — no staff required.',
  },
  {
    Icon: MonitorSmartphone,
    heading: 'An outdated site loses the client before a call',
    body: "A prospect Google-searches your clinic or academy, lands on a site that looks like it hasn't been touched since 2016, and decides before calling that your business probably isn't worth their time.",
    solution: 'First impressions happen in milliseconds. A credible, fast-loading site closes the gap before you even speak to them.',
  },
  {
    Icon: Gauge,
    heading: 'Slow sites lose mobile visitors in under 3 seconds',
    body: "Google's own data: 53% of mobile visits are abandoned if a page takes more than 3 seconds to load. In Sri Lanka, where most browsing happens on mobile, a slow site is effectively a closed door.",
    solution: 'Every site we build targets a sub-2-second load time and a 95+ Google Lighthouse score — this one included.',
  },
]

export default function ProblemSolution() {
  return (
    <Section id="problems" label="Problems we solve" tone="base">
      <SectionHeader
        align="center"
        eyebrow="Why it matters"
        title="Most businesses lose clients before the conversation starts"
      />

      <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problems.map(({ Icon, heading, body, solution }) => (
          <RevealItem key={heading} as="article" className="card card-interactive h-full p-6 flex flex-col gap-4">
            <div className="icon-tile">
              <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary">{heading}</h3>
            <p className="text-text-secondary text-sm leading-relaxed flex-grow">{body}</p>
            <div className="border-t border-border-subtle pt-4">
              <p className="text-accent-light text-sm font-medium">{solution}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
