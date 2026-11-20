import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import CaseStudies from '@/components/sections/CaseStudiesStory'
import WhyUs from '@/components/sections/WhyUs'
import Process from '@/components/sections/Process'
import CtaBanner from '@/components/sections/CtaBanner'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <Services />
      <CaseStudies />
      <WhyUs />
      <Process />
      <CtaBanner />
      <Footer />
    </main>
  )
}
