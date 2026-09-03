import Image from 'next/image'
import MotionWrapper from '@/components/ui/MotionWrapper'

// PORTFOLIO SECTION
//
// Images are lazy-loaded (below the fold) with explicit dimensions to
// prevent layout shift. Dimensions match the generated mockup images.

const mockups = [
  {
    id: 'education-academy',
    src: '/education-cover.jpeg',
    alt: 'Concept design for an MBA and education academy landing page showing course highlights, student registration form, and dark navy branding',
    badge: 'Education Institute',
    title: 'MBA Academy — Student Registration Site',
    description:
      'A full-funnel landing page for an MBA programme or tuition centre, designed to convert website visitors into enrolled students.',
    points: [
      'Solves the "after-hours inquiry" problem with an always-available registration form',
      'Course highlights and programme details replace the need for a phone call to get basic information',
      'Built for mobile — where most Sri Lankan parents first research educational options',
    ],
  },
  {
    id: 'clinic-booking',
    src: '/clinic-cover.jpeg',
    alt: 'Concept design for a premium clinic booking page showing appointment calendar, specialist profiles, and service selection cards',
    badge: 'Clinic / Salon',
    title: 'Premium Clinic — Online Booking System',
    description:
      'An appointment booking interface for clinics, specialist practices, or premium salons that eliminates phone-tag and lets patients book on their own schedule.',
    points: [
      'Specialist selection and real-time availability removes the "call us to check" friction',
      'Calendar-based booking reduces no-shows with automatic confirmation',
      'Premium design signals quality before a patient ever steps through the door',
    ],
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
