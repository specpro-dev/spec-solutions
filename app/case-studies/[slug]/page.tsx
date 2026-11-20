import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import CtaBanner from '@/components/sections/CtaBanner'
import SectionLink from '@/components/ui/SectionLink'
import { caseStudies, formatDate, getCaseStudy, readingMinutes } from '@/features/case-studies/data'
import { site } from '@/config/site'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return caseStudies.map(study => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const study = getCaseStudy((await params).slug)
  if (!study) return {}
  const path = `/case-studies/${study.slug}`
  return {
    title: `${study.title} | ${site.displayName}`,
    description: study.summary,
    alternates: { canonical: path },
    openGraph: {
      type: 'article',
      title: study.title,
      description: study.summary,
      url: path,
      publishedTime: study.published,
      images: [{ url: study.cover.src, alt: study.cover.alt }],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy((await params).slug)
  if (!study) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.summary,
    datePublished: study.published,
    image: `${site.url}${study.cover.src}`,
    author: { '@type': 'Organization', name: site.displayName, url: site.url },
    publisher: { '@type': 'Organization', name: site.displayName, url: site.url },
    mainEntityOfPage: `${site.url}/case-studies/${study.slug}`,
  }

  const facts = [
    ['Client', study.client],
    ['Industry', study.industry],
    ['Location', study.location],
    ['Service', study.services.join(', ')],
  ]

  return (
    <>
      <NavBar />
      <main className="bg-bg-base">
        <article className="pt-36 pb-20 md:pb-28">
          <header className="page-container max-w-5xl">
            <div>
              <SectionLink
                to="case-studies"
                className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" />
                All case studies
              </SectionLink>
            </div>
            <p className="eyebrow mt-6 mb-4">Case study · {study.industry}</p>
            <h1 className="section-title">{study.title}</h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-text-secondary">{study.summary}</p>
            <p className="mt-6 text-sm text-text-muted">
              <time dateTime={study.published}>{formatDate(study.published)}</time> · {readingMinutes(study)} min read
            </p>
          </header>

          <div className="page-container max-w-5xl mt-12">
            <div className="overflow-hidden rounded-image border border-border-subtle bg-bg-surface">
              <Image
                src={study.cover.src}
                alt={study.cover.alt}
                width={1600}
                height={1200}
                priority
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="page-container max-w-5xl mt-12">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-border-subtle py-6">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">{label}</dt>
                  <dd className="mt-1.5 text-sm text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12 space-y-12">
              {study.sections.map(section => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold text-text-primary">{section.heading}</h2>
                  <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed text-text-secondary">
                    {section.paragraphs.map(p => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                  {section.points && (
                    <ul className="mt-6 divide-y divide-border-subtle border-y border-border-subtle">
                      {section.points.map(point => (
                        <li key={point} className="py-3 text-base text-text-primary">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <a
              href={study.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary mt-12"
              aria-label={`Visit ${study.client} (opens in a new tab)`}
            >
              Visit {study.client}
              <ArrowUpRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </article>

        <CtaBanner />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  )
}
