import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

// The "95+ Lighthouse" claims here and in ProblemSolution must match the deployed
// score: run Lighthouse right before launch and qualify or remove them if it's lower.

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
    <Section id="why-us" label="Why Codelynt" tone="ink">
      <SectionHeader
        eyebrow="Our approach"
        title="Software engineers, not designers who also code"
        lede="The distinction matters. An engineer thinks about performance budgets, security surface area, and what happens when your business grows. A designer thinks about what looks good today."
      />

      <RevealGroup className="divide-y divide-border-subtle">
        {differentiators.map(item => (
          <RevealItem
            key={item.number}
            className="py-8 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-start group"
          >
            <div
              className="text-5xl font-bold text-border-strong group-hover:text-accent-text transition-colors duration-300 select-none leading-none"
              aria-hidden="true"
            >
              {item.number}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{item.body}</p>
            </div>
            <div className="md:text-right">
              <span className="inline-block px-3 py-1.5 rounded-lg bg-bg-card border border-border-subtle text-text-primary text-xs font-semibold">
                {item.tag}
              </span>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
