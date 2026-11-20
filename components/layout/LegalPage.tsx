import type { ReactNode } from 'react'

export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main className="bg-bg-surface pt-36 pb-24">
      <article className="page-container max-w-3xl">
        <p className="eyebrow mb-4">Legal</p>
        <h1 className="section-title">{title}</h1>
        <p className="mt-3 text-sm text-text-muted">Last updated {updated}</p>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-text-secondary [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-text-primary [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-text-primary [&_a]:underline">
          {children}
        </div>
      </article>
    </main>
  )
}
