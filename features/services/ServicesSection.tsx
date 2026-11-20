import { ArrowUpRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import ContactLink from '@/components/ui/ContactLink'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { ordinal } from '@/lib/format'
import { services } from './data'

// The intro carries the old Problem/Solution message; every promise here is
// already backed by Process or Why Us, so it must not add new claims.

const PROMISES = [
  'A written spec before any code is written',
  'A fixed price for the scope you sign off',
  'The source code is yours, in your own repository',
  'Working hours that overlap the UK, EU and Australia',
]

export default function ServicesSection() {
  return (
    <Section id="services" tone="base">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16 lg:items-end mb-14 md:mb-20">
        <Reveal>
          <p className="eyebrow mb-4">Services</p>
          <h2 className="section-title">What we build</h2>
          <p className="mt-4 text-base md:text-lg text-text-secondary max-w-[52ch]">
            Off-the-shelf software covers most of what a business does. The part where yours is different usually runs
            on spreadsheets, exports and one person who remembers how it all fits together. That&apos;s the part we
            build, and every project starts with a written specification.
          </p>
        </Reveal>

        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary mb-1">
            Every project includes
          </p>
          <ul className="divide-y divide-border-subtle border-t border-text-primary lg:mb-1.5">
            {PROMISES.map(item => (
              <li key={item} className="py-3 text-base text-text-primary">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <RevealGroup as="ul" className="border-t border-text-primary">
        {services.map(({ id, heading, outcome, body, fit }, i) => (
          <RevealItem key={id} as="li" className="border-b border-border-subtle">
            <ContactLink
              track={{ event: 'service_click', params: { service: id } }}
              className="group grid gap-4 py-8 md:py-10 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_2.75rem] md:gap-8 lg:gap-12 items-start"
            >
              <span className="font-mono text-xs tracking-widest text-text-secondary md:pt-2.5">{ordinal(i)}</span>

              <div>
                <h3 className="text-2xl md:text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] text-text-primary group-hover:text-accent-text transition-colors duration-200">
                  {heading}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">{outcome}</p>
              </div>

              <div>
                <p className="text-base leading-relaxed text-text-secondary">{body}</p>
                <p className="mt-3 text-sm text-text-primary">
                  <span className="text-text-muted">For </span>
                  {fit.join(' · ')}
                </p>
              </div>

              <span
                className="relative hidden md:inline-flex items-center justify-center w-11 h-11 overflow-hidden rounded-full border border-border-subtle text-text-primary transition-colors duration-[600ms] group-hover:bg-text-primary group-hover:text-bg-base group-hover:border-text-primary"
                aria-hidden="true"
              >
                {/* On hover the arrow leaves through the top-right and a copy arrives from the bottom-left. */}
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  className="transition-transform duration-[600ms] ease-out group-hover:translate-x-7 group-hover:-translate-y-7 motion-reduce:transition-none"
                />
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.75}
                  className="absolute -translate-x-7 translate-y-7 transition-transform duration-[600ms] ease-out group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none"
                />
              </span>
              <span className="sr-only">Discuss {heading}</span>
            </ContactLink>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
