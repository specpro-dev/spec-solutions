import { Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'

// Every answer here is already promised in Process or Why Us; this section must not add new claims.

const ROWS = [
  {
    usually: 'You get a price, not a plan.',
    ours: 'A written spec of every feature, screen and integration, before any code.',
  },
  {
    usually: "Scope keeps moving after you've paid.",
    ours: 'Fixed scope you sign off. No surprise invoices.',
  },
  {
    usually: 'You first see the product at launch.',
    ours: 'A working demo every two weeks, while changes are still cheap.',
  },
  {
    usually: 'A theme with plugins bolted on.',
    ours: 'Custom code, built for your process, with no plugins to patch.',
  },
  {
    usually: 'Handover is a zip file and a goodbye.',
    ours: 'A recorded walkthrough and full ownership of the source code.',
  },
]

const columnLabel = 'font-mono text-[11px] uppercase tracking-[0.08em] text-text-secondary'

export default function ProblemSolution() {
  return (
    <Section id="problems" label="How we work differently" tone="base">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow">Sound familiar?</p>
          <h2 className="section-title mt-4 text-[clamp(1.875rem,3.2vw,2.75rem)]">
            Most software projects go wrong before the first line of code.
          </h2>
          <p className="mt-5 text-[17px] text-text-secondary max-w-[44ch]">
            Not because the developers can&apos;t build. Because nobody wrote down what was being built. We start there.
          </p>
        </Reveal>

        <div className="min-w-0">
          <div className="hidden md:grid grid-cols-2 gap-7 pb-2.5 border-b border-text-primary" aria-hidden="true">
            <span className={columnLabel}>Usually</span>
            <span className={columnLabel}>With Codelynt</span>
          </div>

          <RevealGroup as="ul">
            {ROWS.map(({ usually, ours }) => (
              <RevealItem
                key={usually}
                as="li"
                className="grid gap-2 md:grid-cols-2 md:gap-7 py-[18px] border-b border-border-subtle text-base leading-normal"
              >
                <p className="text-text-secondary">
                  <span className="sr-only">Usually: </span>
                  {usually}
                </p>
                <p className="flex gap-2.5 text-text-primary">
                  <Check size={16} strokeWidth={1.75} className="flex-none mt-1 text-accent-text" aria-hidden="true" />
                  <span>
                    <span className="sr-only">With Codelynt: </span>
                    {ours}
                  </span>
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}
