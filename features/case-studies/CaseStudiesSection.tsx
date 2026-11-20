'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { ordinal } from '@/lib/format'
import { caseStudies, caseStudyPath, type CaseStudy } from './data'

type Active = { study: number; step: number }

// Scroll story: on desktop the story sits in a sticky column on the left while the real
// screens scroll past on the right; whichever screen crosses the middle of the viewport
// picks the story and highlights its caption. On phones it falls back to a plain stack.
export default function CaseStudiesSection() {
  const [active, setActive] = useState<Active>({ study: 0, step: 0 })
  const screensRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const screens = screensRef.current?.querySelectorAll<HTMLElement>('[data-screen]')
    if (!screens) return
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          setActive({ study: Number(el.dataset.study), step: Number(el.dataset.step) })
        }
      },
      // A thin band across the middle of the viewport.
      { rootMargin: '-48% 0px -48% 0px' },
    )
    screens.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="case-studies" tone="surface">
      <SectionHeader
        className="mb-16"
        eyebrow="Case studies"
        title="Problems we’ve solved, and how"
        lede="What each business needed, what we built and why we built it that way."
      />

      <div className="lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Sticky story column (desktop). All stories share one grid cell so the column keeps the tallest height. */}
        <div className="hidden lg:block">
          <div className="sticky top-36 grid">
            {caseStudies.map((study, i) => (
              <StoryText key={study.slug} study={study} index={i} visible={active.study === i} activeStep={active.step} />
            ))}
          </div>
        </div>

        <div ref={screensRef} className="space-y-24 lg:space-y-0">
          {caseStudies.map((study, i) => (
            <div key={study.slug} className={i > 0 ? 'lg:mt-40' : ''}>
              {/* Phones: the story sits above its screens. */}
              <div className="mb-8 lg:hidden">
                <p className="eyebrow">
                  {ordinal(i)} · {study.industry}
                </p>
                <h3 className="mt-3 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.025em] text-text-primary">
                  {study.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">{study.highlights.problem}</p>
              </div>

              <div className="space-y-10 lg:space-y-24">
                {study.walkthrough.map((screen, step) => {
                  const isActive = active.study === i && active.step === step
                  return (
                    <figure
                      key={screen.src}
                      data-screen
                      data-study={i}
                      data-step={step}
                      className={`transition-opacity duration-500 ${isActive ? 'lg:opacity-100' : 'lg:opacity-40'}`}
                    >
                      <div className="overflow-hidden rounded-button border border-border-subtle bg-bg-card shadow-card">
                        <div className="flex h-8 items-center gap-1.5 border-b border-border-subtle px-3.5" aria-hidden="true">
                          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                          <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                        </div>
                        <Image
                          src={screen.src}
                          alt={`${study.client}: ${screen.caption}`}
                          width={screen.width}
                          height={screen.height}
                          sizes="(min-width: 1024px) 680px, 100vw"
                          className={`block h-auto ${screen.width < screen.height ? 'mx-auto w-3/5' : 'w-full'}`}
                        />
                      </div>
                      <figcaption className="mt-3 text-sm text-text-muted lg:hidden">{screen.caption}</figcaption>
                    </figure>
                  )
                })}
              </div>

              <ReadLink study={study} className="lg:hidden" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function StoryText({
  study,
  index,
  visible,
  activeStep,
}: {
  study: CaseStudy
  index: number
  visible: boolean
  activeStep: number
}) {
  return (
    <div
      aria-hidden={!visible}
      className={`[grid-area:1/1] transition-[opacity,transform] duration-500 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
      }`}
    >
      <p className="eyebrow">
        {ordinal(index)} / {ordinal(caseStudies.length - 1)} · {study.industry}
      </p>
      <h3 className="mt-4 text-[2.25rem] font-semibold leading-[1.1] tracking-[-0.025em] text-text-primary">
        {study.title}
      </h3>
      <p className="mt-5 text-base leading-relaxed text-text-secondary">{study.highlights.problem}</p>

      <ol className="mt-8 border-t border-border-subtle">
        {study.walkthrough.map((screen, step) => {
          const current = visible && activeStep === step
          return (
            <li
              key={screen.src}
              className={`flex gap-4 border-b border-border-subtle py-3.5 text-[0.9375rem] transition-colors duration-300 ${
                current ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              <span className={`font-mono text-xs pt-1 ${current ? 'text-accent-text' : ''}`}>
                {ordinal(step)}
              </span>
              {screen.caption}
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-[0.9375rem] leading-relaxed text-text-secondary">
        <span className="font-semibold text-text-primary">Why it works: </span>
        {study.highlights.why}
      </p>

      <ReadLink study={study} tabIndex={visible ? undefined : -1} />
    </div>
  )
}

function ReadLink({ study, className = '', tabIndex }: { study: CaseStudy; className?: string; tabIndex?: number }) {
  return (
    <Link
      href={caseStudyPath(study.slug)}
      tabIndex={tabIndex}
      className={`group mt-8 inline-flex items-center gap-2 min-h-[44px] font-semibold text-text-primary ${className}`}
    >
      Read the case study
      <ArrowRight
        size={18}
        strokeWidth={1.75}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  )
}
