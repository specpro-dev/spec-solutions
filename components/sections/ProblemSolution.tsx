import { Clock, MonitorSmartphone, Gauge } from 'lucide-react'
import MotionWrapper from '@/components/ui/MotionWrapper'

// PROBLEM / SOLUTION SECTION
//
// Short, visual, factual — not fear-mongering.
// Each card states a real business problem with a specific consequence,
// then pivots to what good infrastructure solves.
// No made-up statistics; these are patterns any business owner can verify themselves.

const problems = [
  {
    Icon: Clock,
    heading: 'After-hours inquiries go unanswered',
    body: 'A Facebook page can\'t take a booking at 11 PM when a parent is researching class options for their child. Without a website and an intake form, those inquiries move on to whoever picks up next.',
    solution: 'An always-on website captures leads and appointments 24/7 — no staff required.',
  },
  {
    Icon: MonitorSmartphone,
    heading: 'An outdated site loses the client before a call',
    body: 'A prospect Google-searches your clinic or academy, lands on a site that looks like it hasn\'t been touched since 2016, and decides before calling that your business probably isn\'t worth their time.',
    solution: 'First impressions happen in milliseconds. A credible, fast-loading site closes the gap before you even speak to them.',
  },
  {
    Icon: Gauge,
    heading: 'Slow sites lose mobile visitors in under 3 seconds',
    body: 'Google\'s own data: 53% of mobile visits are abandoned if a page takes more than 3 seconds to load. In Sri Lanka, where most browsing happens on mobile, a slow site is effectively a closed door.',
    solution: 'Every site we build targets a sub-2-second load time and a 95+ Google Lighthouse score — this one included.',
  },
]

export default function ProblemSolution() {
  return (
    <section
      id="problems"
      className="section-py bg-bg-base"
      aria-label="Problems we solve"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <MotionWrapper className="text-center mb-16">
          <p className="eyebrow mb-3">
            Why it matters
          </p>
          <h2 className="section-title max-w-2xl mx-auto">
            Most businesses lose clients before the conversation starts
          </h2>
        </MotionWrapper>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <MotionWrapper key={p.heading} delay={i * 0.12}>
              <article className="card h-full p-6 flex flex-col gap-4">
                {/* Icon */}
                <div className="icon-tile">
                  <p.Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </div>

                {/* Problem */}
                <h3 className="text-lg font-semibold text-text-primary">{p.heading}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-grow">{p.body}</p>

                {/* Divider */}
                <div className="border-t border-[var(--border-subtle)] pt-4">
                  <p className="text-accent-light text-sm font-medium">{p.solution}</p>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
