import { Mail, MapPin } from 'lucide-react'
import Logo from './Logo'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#team' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-base border-t border-[var(--border-subtle)] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo height={32} />
            <p className="mt-4 max-w-sm text-sm text-text-secondary">
              A modern technology company building AI-powered solutions and scalable digital products.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-1 list-none m-0 p-0">
              {LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center min-h-[44px] text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 text-sm text-text-secondary">
            <a href="mailto:specprochat@gmail.com" className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200">
              <Mail size={16} strokeWidth={1.75} className="text-accent-light" aria-hidden="true" />
              specprochat@gmail.com
            </a>
            <p className="flex items-center gap-2">
              <MapPin size={16} strokeWidth={1.75} className="text-accent-light" aria-hidden="true" />
              Kalutara &amp; Colombo, Sri Lanka
            </p>
          </div>
        </div>

        <p className="mt-10 pt-6 border-t border-[var(--border-subtle)] text-xs text-text-secondary">
          © {new Date().getFullYear()} CODELYNT. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
