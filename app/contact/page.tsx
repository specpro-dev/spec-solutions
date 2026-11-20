import type { Metadata } from 'next'
import ContactSection from '@/features/contact/ContactSection'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us about your project. We reply within one business day to set up a call, and if we’re not the right fit we’ll say so.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    // pt-24 clears the fixed nav bar; the section adds its usual padding below it.
    <main className="bg-bg-surface pt-24">
      <ContactSection />
    </main>
  )
}
