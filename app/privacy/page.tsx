import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'
import { site } from '@/config/site'

// Keep this in step with what the site actually collects (features/contact/schema.ts, lib/analytics).
// Have it reviewed before launch.

export const metadata: Metadata = {
  title: `Privacy policy | ${site.displayName}`,
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="20 November 2026">
      <section>
        <h2>What we collect</h2>
        <p>When you send the contact form, we receive the details you enter:</p>
        <ul>
          <li>Your name</li>
          <li>Your business name</li>
          <li>Your phone number</li>
          <li>The goal you choose</li>
        </ul>
        <p className="mt-3">
          We also use Google Analytics to count visits and clicks on this site. It sets cookies and collects anonymous
          usage data such as pages viewed and device type.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <p>
          We use your contact details only to reply to your enquiry and discuss your project. We don&apos;t sell or
          share them with anyone for marketing.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>We keep enquiry details only as long as we need them to talk about or deliver your project.</p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          To see, correct or delete the details we hold about you, email{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>. You can block analytics cookies in your browser settings.
        </p>
      </section>
    </LegalPage>
  )
}
