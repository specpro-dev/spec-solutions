import MotionWrapper from '@/components/ui/MotionWrapper'

// PROBLEM / SOLUTION SECTION
//
// Short, visual, factual — not fear-mongering.
// Each card states a real business problem with a specific consequence,
// then pivots to what good infrastructure solves.
// No made-up statistics; these are patterns any business owner can verify themselves.

const problems = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 3C7.925 3 3 7.925 3 14s4.925 11 11 11 11-4.925 11-11S20.075 3 14 3Z" stroke="#C9963A" strokeWidth="1.5"/>
        <path d="M14 8v6l4 2" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="22" r="5" fill="#0F1B3C" stroke="#C9963A" strokeWidth="1.5"/>
        <path d="M22 20v3M22 24.5v.5" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    heading: 'After-hours inquiries go unanswered',
    body: 'A Facebook page can\'t take a booking at 11 PM when a parent is researching class options for their child. Without a website and an intake form, those inquiries move on to whoever picks up next.',
    solution: 'An always-on website captures leads and appointments 24/7 — no staff required.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="3" y="5" width="22" height="18" rx="2" stroke="#C9963A" strokeWidth="1.5"/>
        <path d="M3 10h22" stroke="#C9963A" strokeWidth="1.5"/>
        <path d="M8 7h.01M12 7h.01M16 7h.01" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 15h4M8 19h6" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="21" cy="21" r="4" fill="#0F1B3C" stroke="#C9963A" strokeWidth="1.5"/>
        <path d="M19.5 21l1 1 2-2" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    heading: 'An outdated site loses the client before a call',
    body: 'A prospect Google-searches your clinic or academy, lands on a site that looks like it hasn\'t been touched since 2016, and decides before calling that your business probably isn\'t worth their time.',
    solution: 'First impressions happen in milliseconds. A credible, fast-loading site closes the gap before you even speak to them.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14 5C9.03 5 5 9.03 5 14s4.03 9 9 9" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 14l4-4-4-4" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 10H16a5 5 0 0 0 0 10" stroke="#C9963A" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="21" cy="21" r="4" fill="#0F1B3C" stroke="#ef4444" strokeWidth="1.5"/>
        <path d="M21 19v3M21 23.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    heading: 'Slow sites lose mobile visitors in under 3 seconds',
    body: 'Google\'s own data: 53% of mobile visits are abandoned if a page takes more than 3 seconds to load. In Sri Lanka, where most browsing happens on mobile, a slow site is effectively a closed door.',
    solution: 'Every site we build targets a sub-2-second load time and a 95+ Google Lighthouse score — this one included.',
  },
]

export default function ProblemSolution() {
  return (
    <section
      id="problems"
      className="section-padding bg-navy"
      aria-label="Problems we solve"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <MotionWrapper className="text-center mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Why it matters
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
            Most businesses lose clients before the conversation starts
          </h2>
        </MotionWrapper>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <MotionWrapper key={p.heading} delay={i * 0.12}>
              <article className="h-full p-6 rounded-2xl border border-white/8 bg-navy-light/40 flex flex-col gap-4 hover:border-gold/20 transition-colors duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  {p.icon}
                </div>

                {/* Problem */}
                <h3 className="text-lg font-semibold text-white">{p.heading}</h3>
                <p className="text-white/60 text-sm leading-relaxed flex-grow">{p.body}</p>

                {/* Divider */}
                <div className="border-t border-white/8 pt-4">
                  <p className="text-gold text-sm font-medium">{p.solution}</p>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
