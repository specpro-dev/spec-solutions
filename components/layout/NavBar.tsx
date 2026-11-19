'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import SectionLink from '@/components/ui/SectionLink'
import { linkableSections, navSections, site } from '@/config/site'

const contactTrack = { event: 'cta_click', params: { cta_label: 'Get in Touch', section: 'navbar' } }

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    openerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const focusables = () =>
      Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return closeMenu()
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last?.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen, closeMenu])

  const hideMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`border-b transition-colors duration-200 ${
            scrolled ? 'bg-bg-base/80 backdrop-blur-md border-border-subtle' : 'bg-transparent border-transparent'
          }`}
        >
          <nav className="page-container h-16 flex items-center justify-between" aria-label="Main navigation">
            <SectionLink to="top" aria-label={`${site.name} — return to top`}>
              <Logo height={28} priority className="md:hidden" />
              <Logo height={32} priority className="hidden md:block" />
            </SectionLink>

            <ul className="hidden md:flex items-center gap-8">
              {navSections.map(id => (
                <li key={id}>
                  <SectionLink
                    to={id}
                    className="inline-flex items-center min-h-[44px] text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {linkableSections[id]}
                  </SectionLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <SectionLink to="contact" track={contactTrack} className="btn btn-primary hidden md:inline-flex">
                Get in Touch →
              </SectionLink>

              <button
                ref={openerRef}
                className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-button text-text-primary cursor-pointer focus-ring"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <Menu size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <m.div
            ref={drawerRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: prefersReduced ? 0 : '100%', opacity: prefersReduced ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: prefersReduced ? 0 : '100%', opacity: prefersReduced ? 0 : 1 }}
            transition={{ type: 'tween', duration: prefersReduced ? 0.15 : 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col h-[100dvh] px-4 sm:px-6 pt-3 pb-10 bg-bg-base"
          >
            <div className="flex items-center justify-between h-16">
              <Logo height={28} />
              <button
                onClick={closeMenu}
                className="inline-flex items-center justify-center w-11 h-11 rounded-button text-text-primary cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X size={24} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <nav className="flex flex-col mt-8" aria-label="Mobile navigation">
              {navSections.map(id => (
                <SectionLink
                  key={id}
                  to={id}
                  onNavigate={hideMenu}
                  className="py-5 text-2xl font-semibold tracking-tight border-b border-border-subtle text-text-primary hover:text-accent-light transition-colors duration-200"
                >
                  {linkableSections[id]}
                </SectionLink>
              ))}
            </nav>

            <div className="mt-auto">
              <SectionLink to="contact" track={contactTrack} onNavigate={hideMenu} className="btn btn-primary w-full">
                Get in Touch →
              </SectionLink>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
