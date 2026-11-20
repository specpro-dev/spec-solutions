import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, type LucideIcon } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import SectionLink from '@/components/ui/SectionLink'
import ContactLink from '@/components/ui/ContactLink'
import WhatsAppLink from '@/components/ui/WhatsAppLink'
import { sections } from '@/config/sections'
import { site, socialLinks } from '@/config/site'
import { services } from '@/features/services/data'

const linkCls =
  'inline-flex items-center min-h-[44px] text-sm text-text-secondary hover:text-text-primary transition-colors duration-200'
const headingCls = 'text-xs font-semibold uppercase tracking-[0.16em] text-text-primary mb-2'

const SOCIAL: { key: keyof typeof socialLinks; label: string; Icon: LucideIcon }[] = [
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
]

const iconBtn =
  'inline-flex items-center justify-center w-11 h-11 rounded-button border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors duration-200'

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <nav aria-label={title}>
      <p className={headingCls}>{title}</p>
      <ul>{children}</ul>
    </nav>
  )
}

export default function Footer() {
  const profiles = SOCIAL.filter(({ key }) => socialLinks[key])

  return (
    <footer className="theme-ink bg-bg-base py-14">
      <div className="page-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo on="dark" height={32} />
            <p className="mt-4 max-w-sm text-sm text-text-secondary">{site.description}</p>
            <div className="mt-5 space-y-2 text-sm text-text-secondary">
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-text-primary transition-colors duration-200">
                <Mail size={16} strokeWidth={1.75} className="text-accent-text" aria-hidden="true" />
                {site.email}
              </a>
              <p className="flex items-center gap-2">
                <MapPin size={16} strokeWidth={1.75} className="text-accent-text" aria-hidden="true" />
                {site.location}
              </p>
            </div>
          </div>

          <Column title="Services">
            {services.map(({ id, heading }) => (
              <li key={id}>
                <SectionLink to="services" className={linkCls}>
                  {heading}
                </SectionLink>
              </li>
            ))}
          </Column>

          <Column title="Company">
            <li>
              <SectionLink to="why-us" className={linkCls}>
                {sections['why-us']}
              </SectionLink>
            </li>
            <li>
              <SectionLink to="process" className={linkCls}>
                How we work
              </SectionLink>
            </li>
            <li>
              <ContactLink className={linkCls}>
                Contact
              </ContactLink>
            </li>
          </Column>

          <Column title="Resources">
            <li>
              <SectionLink to="case-studies" className={linkCls}>
                {sections['case-studies']}
              </SectionLink>
            </li>
            <li>
              <WhatsAppLink location="footer" className={linkCls}>
                WhatsApp us
              </WhatsAppLink>
            </li>
          </Column>

          <Column title="Legal">
            <li>
              <Link href="/privacy" className={linkCls}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkCls}>
                Terms of use
              </Link>
            </li>
          </Column>
        </div>

        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <ul className="flex items-center gap-2" aria-label="Social links">
            {profiles.map(({ key, label, Icon }) => (
              <li key={key}>
                <a href={socialLinks[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconBtn}>
                  <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                </a>
              </li>
            ))}
            <li>
              <WhatsAppLink location="footer_icon" aria-label="WhatsApp" className={iconBtn}>
                <MessageCircle size={18} strokeWidth={1.75} aria-hidden="true" />
              </WhatsAppLink>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
