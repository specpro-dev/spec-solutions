import Image from 'next/image'
import { ArrowUpRight, Check } from 'lucide-react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'

const projects = [
  {
    id: 'a2a-services',
    src: '/a2a-cover.jpeg',
    alt: 'Screenshot of A2A Services web app showing menu browsing, cart, and checkout flow for a UK institutional catering company',
    badge: 'Client Project — UK Catering',
    title: 'A2A Services — Ordering Platform',
    description:
      'A production Angular single-page application built for a UK institutional catering company, handling end-to-end ordering from menu browsing through checkout.',
    points: [
      'Persisted cart and PayPal SDK checkout remove friction from bulk institutional ordering',
      'Reactive Firestore-backed service layer powers live menus, galleries, and enquiry data',
      'Standalone-component architecture with routes segmented by customer type for scalable growth',
    ],
    liveUrl: 'https://a2aservicesltd.co.uk/',
  },
  {
    id: 'dealsbuzz',
    src: '/dealsbuzz-cover.jpeg',
    alt: 'Screenshot of DealsBuzz e-commerce storefront showing footwear categories, featured products, and pre-order flow',
    badge: 'Client Project — E-commerce',
    title: 'DealsBuzz — Footwear E-commerce Store',
    description:
      "A live D2C storefront for Sri Lanka's authentic Crocs and footwear retailer, built to convert browsers into pre-order customers.",
    points: [
      'Category-based browsing and trending/featured sections guide first-time visitors to a purchase',
      'Pre-order flow with 30% upfront payment reduces cart abandonment on new-drop items',
      'Order tracking and size-guide pages cut post-purchase support inquiries',
    ],
    liveUrl: 'https://www.dealsbuzz.lk/',
  },
]

export default function Portfolio() {
  return (
    <Section id="portfolio" label="Portfolio" tone="base">
      <SectionHeader align="center" eyebrow="The work" title="What we build looks like this" />

      <RevealGroup className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map(project => (
          <RevealItem key={project.id} as="article" className="card card-interactive h-full overflow-hidden group">
            <div className="w-full overflow-hidden border-b border-border-subtle">
              <Image
                src={project.src}
                alt={project.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover motion-safe:group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="p-6">
              <span className="eyebrow">{project.badge}</span>
              <h3 className="mt-2 mb-3 text-lg font-semibold text-text-primary">{project.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{project.description}</p>
              <div className="mt-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary text-sm"
                  aria-label={`${project.title} — view live project (opens in a new tab)`}
                >
                  Live Project
                  <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </div>

              <ul className="mt-5 space-y-2.5" aria-label="Project highlights">
                {project.points.map(point => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check size={16} strokeWidth={1.75} className="flex-shrink-0 mt-0.5 text-accent-text" aria-hidden="true" />
                    <span className="text-text-secondary text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  )
}
