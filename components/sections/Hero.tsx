import { ArrowRight } from 'lucide-react'
import BrandSymbol from '@/components/ui/BrandSymbol'
import { alpha, colors } from '@/config/theme'
import SectionLink from '@/components/ui/SectionLink'

// The H1 is the LCP element: keep it text-only and never animate it.

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden min-h-[100svh] bg-bg-base">
      <div className="absolute inset-0 hero-glow" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />

      <BrandSymbol
        gradientId="hero-sym"
        outline
        strokeWidth={0.8}
        className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 w-[28rem] md:w-[40rem] lg:w-[46rem] opacity-30 md:opacity-40"
        style={{ filter: `drop-shadow(0 0 40px ${alpha(colors.accent.DEFAULT, 0.35)})` }}
      />

      <div className="relative page-container w-full pt-32 pb-20">
        <p className="eyebrow mb-6">Build · Innovate · Transform</p>

        <h1 className="font-semibold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-text-primary max-w-3xl">
          Turn Ideas Into <span className="text-gradient">Intelligent Solutions</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed">
          Custom software. AI-powered solutions. Real business impact.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <SectionLink to="contact" track={{ event: 'cta_click', params: { label: 'hero_contact', location: 'hero' } }} className="btn btn-primary">
            Get in Touch
            <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
          </SectionLink>

          <SectionLink to="portfolio" track={{ event: 'cta_click', params: { label: 'hero_portfolio', location: 'hero' } }} className="btn btn-secondary">
            View Our Work
          </SectionLink>
        </div>
      </div>
    </section>
  )
}
