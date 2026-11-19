import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ProblemSolution from '@/components/sections/ProblemSolution'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import WhyUs from '@/components/sections/WhyUs'
import Team from '@/components/sections/Team'
import ContactSection from '@/features/contact/ContactSection'

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <ProblemSolution />
      <Services />
      <Process />
      <Portfolio />
      <WhyUs />
      <Team />
      <ContactSection />
      <Footer />
    </main>
  )
}
