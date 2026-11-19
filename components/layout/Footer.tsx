import { Mail, MapPin } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import SectionLink from '@/components/ui/SectionLink'
import { linkableSections, sectionIds, site } from '@/config/site'

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-border-subtle py-12">
      <div className="page-container">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo height={32} />
            <p className="mt-4 max-w-sm text-sm text-text-secondary">{site.description}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-1">
              {sectionIds.map(id => (
                <li key={id}>
                  <SectionLink
                    to={id}
                    className="inline-flex items-center min-h-[44px] text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {linkableSections[id]}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 text-sm text-text-secondary">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200"
            >
              <Mail size={16} strokeWidth={1.75} className="text-accent-light" aria-hidden="true" />
              {site.email}
            </a>
            <p className="flex items-center gap-2">
              <MapPin size={16} strokeWidth={1.75} className="text-accent-light" aria-hidden="true" />
              {site.location}
            </p>
          </div>
        </div>

        <p className="mt-10 pt-6 border-t border-border-subtle text-xs text-text-secondary">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
