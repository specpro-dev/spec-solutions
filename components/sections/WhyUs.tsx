import Image from 'next/image'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ordinal } from '@/lib/format'

const differentiators = [
  {
    title: 'The spec comes first',
    body: "Most overruns start with a vague brief. We write down every screen, rule and integration before we quote, so the price is tied to a document you can read. If the scope changes, the spec changes first and you see the cost before anyone builds it.",
    tag: 'Fixed scope, written down.',
  },
  {
    title: 'Built to work with what you already run',
    body: 'A new system has to talk to your accounting package, your CRM and that database from 2011. We plan integrations and data migration in the spec, so they are priced and scheduled rather than discovered in week eight.',
    tag: 'Integrations planned up front.',
  },
  {
    title: 'Code any team can pick up',
    body: 'Typed, tested and documented, in a repository you own. If you later hire your own developers or move to another supplier, they can carry on from where we left off instead of starting again.',
    tag: 'Your repository, your IP.',
  },
  {
    title: 'Senior engineers, sensible rates',
    body: "We're based in Colombo, so our working day covers UK and European mornings and Australian afternoons. You speak directly to the engineers building your system and see working software every two weeks.",
    tag: 'Time-zone overlap with the UK, EU and AU.',
  },
]

export default function WhyUs() {
  return (
    <Section id="why-us" tone="ink">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
        <Reveal className="lg:sticky lg:top-32">
          <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-image border border-border-subtle">
            <Image
              src="/Why-Us.png"
              alt="An engineer coding on a laptop at night beside a printed, hand-annotated specification"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-[50%_70%]"
            />
          </div>
        </Reveal>

        <div className="min-w-0">
          <SectionHeader
            className="mb-10"
            eyebrow="Our approach"
            title="A small senior team, not an agency pipeline"
            lede="The people on your first call are the people who write the code. No account managers passing messages along, and no handover to a different team once the project goes live."
          />

          <RevealGroup className="divide-y divide-border-subtle border-t border-border-subtle">
            {differentiators.map((item, i) => (
              <RevealItem key={item.title} className="py-8 grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-start group">
                <div
                  className="text-3xl font-bold text-border-strong group-hover:text-accent-text transition-colors duration-300 select-none leading-none"
                  aria-hidden="true"
                >
                  {ordinal(i)}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-sm">{item.body}</p>
                  <p className="mt-3 text-xs font-semibold text-text-primary">{item.tag}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}
