'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { trackEvent } from '@/lib/analytics'

// Careers omitted: no page or anchor exists yet.
const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Solutions', id: 'portfolio' },
  { label: 'About', id: 'team' },
] as const

function scrollToSection(id: string, e: React.MouseEvent) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', `/${id}`)
  }
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rafRef = useRef<number>(0)
  const drawerRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => setScrolled(window.scrollY > 40))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    openerRef.current?.focus()
  }, [])

  // Scroll lock, ESC to close, and focus trap while the drawer is open
  useEffect(() => {
    if (!menuOpen) return
    document.body.style.overflow = 'hidden'
    const root = drawerRef.current
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [])
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen, closeMenu])

  const goContact = (e: React.MouseEvent, afterClick?: () => void) => {
    scrollToSection('contact', e)
    afterClick?.()
    trackEvent('cta_click', { cta_label: 'Get in Touch', section: 'navbar' })
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`border-b transition-colors duration-200 ${
            scrolled
              ? 'bg-bg-base/80 backdrop-blur-md border-[var(--border-subtle)]'
              : 'bg-transparent border-transparent'
          }`}
        >
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
            aria-label="Main navigation"
          >
            <a
              href="/"
              aria-label="CODELYNT — return to top"
              onClick={e => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
                history.pushState(null, '', '/')
              }}
            >
              <Logo height={28} priority className="md:hidden" />
              <Logo height={32} priority className="hidden md:block" />
            </a>

            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <a
                    href={`/${id}`}
                    className="inline-flex items-center min-h-[44px] text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
                    onClick={e => scrollToSection(id, e)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <a href="/contact" className="btn btn-primary hidden md:inline-flex" onClick={e => goContact(e)}>
                Get in Touch →
              </a>

              <button
                ref={openerRef}
                className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-button text-text-primary cursor-pointer focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
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
          <motion.div
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
              {NAV_LINKS.map(({ label, id }) => (
                <a
                  key={id}
                  href={`/${id}`}
                  onClick={e => {
                    scrollToSection(id, e)
                    setMenuOpen(false)
                  }}
                  className="py-5 text-2xl font-semibold tracking-tight border-b border-[var(--border-subtle)] text-text-primary hover:text-accent-light transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href="/contact"
                onClick={e => goContact(e, () => setMenuOpen(false))}
                className="btn btn-primary w-full"
              >
                Get in Touch →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
