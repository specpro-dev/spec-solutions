import NavBar from '@/components/ui/NavBar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import ProblemSolution from '@/components/sections/ProblemSolution'
import Portfolio from '@/components/sections/Portfolio'
import Process from '@/components/sections/Process'
import WhyUs from '@/components/sections/WhyUs'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'
import Logo from '@/components/ui/Logo'

// Main page — single scrolling layout assembling all sections in order.
// Each section has a semantic <section> with an id for anchor navigation.

export default function Home() {
  return (
    <main>
      <NavBar />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Services */}
      <Services />

      {/* 3. Problem / Solution */}
      <ProblemSolution />

      {/* 4. Portfolio */}
      <Portfolio />

      {/* 5. Process */}
      <Process />

      {/* 6. Why Us */}
      <WhyUs />

      {/* 7. Team */}
      <Team />

      {/* 8. Contact / Lead Capture */}
      <Contact />

      {/* Footer */}
      <footer className="bg-navy-dark border-t border-white/8 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Logo size={28} variant="light" />
          </div>

          <p className="text-white/30 text-xs text-center sm:text-right">
            © {new Date().getFullYear()} Spec Solutions. Kalutara &amp; Colombo, Sri Lanka.
            <br className="hidden sm:block" />
            {' '}Custom-coded. Not a template.
          </p>
        </div>
      </footer>
    </main>
  )
}
