import MotionWrapper from '@/components/ui/MotionWrapper'

// WHY US / OUR APPROACH SECTION
//
// Positions Spec Solutions as software engineers, not designers-who-also-code.
// Deliberately avoids the standard "3 icons in a row" layout — uses a numbered
// approach that feels engineering-specific and structured, not generic agency copy.
//
// ⚠️  IMPORTANT — "95+ Lighthouse score" copy:
//     This claim is conditional on the actual deployed score.
//     Verify the Lighthouse audit passes LAST, right before launch.
//     If the score is in the 80s, this copy must be removed or qualified.
//     See: implementation plan, WhyUs section note.

const differentiators = [
  {
    number: '01',
    title: 'Custom-coded, not a template',
    body: "WordPress, Wix, and Webflow templates are built for everyone — which means they're optimised for no one in particular. We write code from scratch for your specific business. That means faster load times, zero plugin bloat, and a site that can be extended to do whatever your business needs next.",
    tag: 'No templates. No page builders.',
  },
  {
    number: '02',
    title: 'Built for speed — measurably',
    body: "Speed isn't a vague promise here. This very site scores 95+ on Google's own Lighthouse speed test (Performance, Accessibility, Best Practices, SEO). Open Chrome DevTools and run it yourself. That score directly affects how high Google ranks your site in search results.",
    tag: 'Lighthouse 95+ — verify it yourself.',
  },
  {
    number: '03',
    title: 'Scales with your business',
    body: "We build the foundation right so you're not starting over in 18 months. Need to add online payments? A student portal? An automated appointment reminder system? These can be added to a properly architected site without a full rebuild. We plan for where you're going, not just where you are.",
    tag: 'Bookings, payments, portals — all addable.',
  },
  {
    number: '04',
    title: 'No plugin vulnerabilities',
    body: "WordPress powers 43% of the web, which makes it the #1 target for automated hacking scripts. Most attacks don't target you specifically — they scan for known plugin vulnerabilities en masse. Custom-coded sites have no plugin surface area to exploit. Fewer moving parts means fewer things that can go wrong.",
    tag: 'No plugins. No known attack vectors.',
  },
]

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="section-padding bg-navy"
      aria-label="Why Spec Solutions"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <MotionWrapper className="mb-16">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            Our approach
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-xl">
            Software engineers, not designers who also code
          </h2>
          <p className="mt-4 text-white/60 max-w-lg leading-relaxed">
            The distinction matters. An engineer thinks about performance budgets,
            security surface area, and what happens when your business grows.
            A designer thinks about what looks good today.
          </p>
        </MotionWrapper>

        {/* Differentiators — staggered numbered list layout */}
        <div className="space-y-0 divide-y divide-white/8">
          {differentiators.map((item, i) => (
            <MotionWrapper key={item.number} delay={i * 0.1}>
              <div className="py-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start group">
                {/* Number */}
                <div
                  className="text-5xl font-bold text-white/8 group-hover:text-white/12 transition-colors duration-300 select-none leading-none"
                  aria-hidden="true"
                >
                  {item.number}
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{item.body}</p>
                </div>

                {/* Tag */}
                <div className="md:text-right">
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold text-xs font-semibold">
                    {item.tag}
                  </span>
                </div>
              </div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
