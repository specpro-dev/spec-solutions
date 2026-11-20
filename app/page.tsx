import SectionScroll from '@/components/ui/SectionScroll'
import Hero from '@/components/sections/Hero'
import ServicesSection from '@/features/services/ServicesSection'
import CaseStudiesSection from '@/features/case-studies/CaseStudiesSection'
import WhyUs from '@/components/sections/WhyUs'
import Process from '@/components/sections/Process'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Home() {
  return (
    <main>
      <SectionScroll />
      <Hero />
      <ServicesSection />
      <CaseStudiesSection />
      <WhyUs />
      <Process />
      <CtaBanner />
    </main>
  )
}
