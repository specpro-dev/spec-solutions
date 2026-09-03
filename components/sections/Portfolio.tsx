import Image from 'next/image'
import MotionWrapper from '@/components/ui/MotionWrapper'
import Link from 'next/link'

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
      className="section-padding bg-navy-dark"
      aria-label="Portfolio"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <MotionWrapper className="text-center mb-4">
          <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-3">
            The work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
            What we build looks like this
          </h2>
        </MotionWrapper>

        <MotionWrapper className="text-center mb-16" delay={0.1}>
          <p className="text-white/50 text-sm">
            Both designs below are concept mockups — not live client sites.
          </p>
        </MotionWrapper>

        {/* 2-card grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mockups.map((mockup, i) => (
            <MotionWrapper key={mockup.id} delay={i * 0.15}>
              <article
                id={`portfolio-${mockup.id}`}
                className="bg-navy rounded-2xl border border-white/8 overflow-hidden hover:border-gold/20 transition-colors duration-300 group"
              >
                {/* Mockup image — lazy loaded, explicit dimensions prevent layout shift */}
                <div className="relative w-full overflow-hidden bg-navy-light">
                  {/* ⚠️ PLACEHOLDER: Replace with actual client work before launch */}
                  <Image
                    src={mockup.src}
                    alt={mockup.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />


                </div>

                {/* Card content */}
                <div className="p-6">
                  <span className="text-gold text-xs font-semibold tracking-widest uppercase">
                    {mockup.badge}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white">{mockup.title}</h3>
                  <p className="mt-2 text-white/60 text-sm leading-relaxed">
                    {mockup.description}
                  </p>
                  <div className="mt-2">
                    <Link href={mockup.liveUrl} className="text-gold bg-gold/10 hover:bg-gold/20 px-3 py-2 rounded-lg text-sm font-semibold tracking-widest uppercase">
                      Live Project
                    </Link>
                  </div>

                  {/* Bullet points */}
                  <ul className="mt-4 space-y-2.5" aria-label="What this design solves">
                    {mockup.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <svg
                          className="flex-shrink-0 mt-0.5"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 7l3.5 3.5L12 3"
                            stroke="#C9963A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-white/70 text-sm">{point}</span>
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
