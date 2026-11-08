import Image from 'next/image'
import MotionWrapper from '@/components/ui/MotionWrapper'
import { ArrowUpRight, Check } from 'lucide-react'

// PORTFOLIO SECTION
//
// Images are lazy-loaded (below the fold) with explicit dimensions to
// prevent layout shift. Dimensions match the generated mockup images.

const mockups = [
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
    <section
      id="portfolio"
      className="section-py bg-bg-base"
      aria-label="Portfolio"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <MotionWrapper className="text-center mb-12">
          <p className="eyebrow mb-3">The work</p>
          <h2 className="section-title max-w-2xl mx-auto">
            What we build looks like this
          </h2>
        </MotionWrapper>

        {/* 2-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockups.map((mockup, i) => (
            <MotionWrapper key={mockup.id} delay={i * 0.15}>
              <article id={`portfolio-${mockup.id}`} className="card h-full overflow-hidden group">
                {/* Cover image with navy overlay for text legibility */}
                <div className="relative w-full overflow-hidden">
                  <Image
                    src={mockup.src}
                    alt={mockup.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover motion-safe:group-hover:scale-[1.02] transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, #0B1020 0%, rgba(11,16,32,0.85) 40%, transparent 100%)' }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="eyebrow">{mockup.badge}</span>
                    <h3 className="mt-2 text-lg font-semibold text-text-primary">{mockup.title}</h3>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {mockup.description}
                  </p>
                  <div className="mt-4">
                    <a
                      href={mockup.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary text-sm"
                      aria-label={`${mockup.title} — view live project (opens in a new tab)`}
                    >
                      Live Project
                      <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                  </div>

                  <ul className="mt-5 space-y-2.5" aria-label="Project highlights">
                    {mockup.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check size={16} strokeWidth={1.75} className="flex-shrink-0 mt-0.5 text-accent-2" aria-hidden="true" />
                        <span className="text-text-secondary text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  )
}
