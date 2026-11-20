import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { caseStudies, caseStudyPath } from '@/features/case-studies/data'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    ...caseStudies.map(study => ({
      url: site.url + caseStudyPath(study.slug),
      lastModified: new Date(study.published),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    { url: `${site.url}/contact`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${site.url}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
