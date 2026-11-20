import type { Metadata } from 'next'
import LegalPage from '@/components/layout/LegalPage'
import { site } from '@/config/site'

// Placeholder terms for using this website only. Project work is covered by each
// client's signed specification and agreement. Have it reviewed before launch.

export const metadata: Metadata = {
  title: `Terms of use | ${site.displayName}`,
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="20 November 2026">
      <section>
        <h2>About these terms</h2>
        <p>
          These terms cover your use of this website. Any project we build for you is covered by the specification and
          agreement we both sign, not by this page.
        </p>
      </section>

      <section>
        <h2>Content on this site</h2>
        <p>
          The text, design and code of this site belong to {site.displayName}. Client projects shown here belong to
          their owners and appear with their permission.
        </p>
      </section>

      <section>
        <h2>Information, not an offer</h2>
        <p>
          Timelines and descriptions on this site are general. The scope, price and schedule for your project are only
          fixed once we agree them in writing.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </section>
    </LegalPage>
  )
}
