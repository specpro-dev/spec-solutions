import { ArrowRight } from 'lucide-react'
import SectionLink from '@/components/ui/SectionLink'
import ContactLink from '@/components/ui/ContactLink'

// The statement is anchored low on the left; the H1 is the LCP element: text only, never animated.

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="flex flex-col bg-bg-surface min-h-[min(78svh,680px)] pt-16"
    >
      <div className="page-container w-full flex flex-col flex-1">
        <div className="flex-1 min-h-24" />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-end pb-16 lg:pb-24">
          <h1 className="font-semibold text-text-primary text-[clamp(44px,5.6vw,88px)] leading-[0.98] tracking-[-0.035em] [text-wrap:balance]">
            Software, built to the{' '}
            <span className="underline decoration-accent decoration-[0.08em] underline-offset-[0.12em] [text-decoration-skip-ink:none]">
              spec.
            </span>
          </h1>

          <div className="flex flex-col gap-7 lg:pb-2">
            <p className="text-lg leading-[1.55] text-text-secondary max-w-[40ch]">
              We build business systems, products and AI tools for companies in the UK, Europe and Australia. You get a
              written spec first, with every screen, integration and edge case listed, and we build what you signed.
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <ContactLink
                track={{ event: 'cta_click', params: { label: 'hero_contact', location: 'hero' } }}
                className="btn btn-primary"
              >
                Start your spec
                <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
              </ContactLink>
              <SectionLink
                to="case-studies"
                track={{ event: 'cta_click', params: { label: 'hero_case_studies', location: 'hero' } }}
                className="text-link inline-flex items-center min-h-[44px] font-semibold text-text-primary"
              >
                Read the case studies
              </SectionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
