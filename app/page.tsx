import NavBar from '@/components/ui/NavBar'
import Hero from '@/components/sections/Hero'
import ProblemSolution from '@/components/sections/ProblemSolution'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Portfolio from '@/components/sections/Portfolio'
import WhyUs from '@/components/sections/WhyUs'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/ui/Footer'

// Main page — single scrolling layout. Each section has an id for anchor navigation.

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
      <Contact />
      <Footer />
    </main>
  )
}
