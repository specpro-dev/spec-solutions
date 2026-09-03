'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Logo from './Logo'
import { trackEvent } from '@/lib/analytics'

const NAV_LINKS = [
  { label: 'Services', id: 'services' },
  { label: 'Work',     id: 'portfolio' },
  { label: 'Process',  id: 'process' },
  { label: 'Team',     id: 'team' },
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
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const rafRef                    = useRef<number>(0)
  const prefersReduced            = useReducedMotion()

  // rAF-throttled scroll detection
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Prevent background scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {/* ── Sticky bar ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ willChange: 'transform' }}
      >
        <div
          style={{
            backgroundColor: scrolled ? 'rgba(8, 12, 20, 0.92)' : 'transparent',
            backdropFilter:         scrolled ? 'blur(12px)' : 'none',
            WebkitBackdropFilter:   scrolled ? 'blur(12px)' : 'none',
            borderBottom: `1px solid ${scrolled ? 'var(--border-subtle)' : 'transparent'}`,
            transition: 'background-color 0.2s ease-out, border-color 0.2s ease-out',
          }}
        >
          <nav
            className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <a href="/" aria-label="Spec Solutions — return to top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); history.pushState(null, '', '/') }}>
              <Logo variant="horizontal" />
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0" role="list">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <a
                    href={`/${id}`}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}
                    onClick={e => scrollToSection(id, e)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right cluster */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <a
                href="/contact"
                className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-md border cursor-pointer transition-colors duration-200"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'var(--accent)'
                  el.style.color = 'var(--navy-dark)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'transparent'
                  el.style.color = 'var(--accent)'
                }}
                onClick={e => {
                  scrollToSection('contact', e)
                  trackEvent('cta_click', { cta_label: 'Book Discovery Call', section: 'navbar' })
                }}
              >
                Book a Discovery Call
              </a>

              {/* Hamburger — mobile only */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <span className="block w-5 h-px" style={{ backgroundColor: 'var(--text-primary)' }} />
                <span className="block w-5 h-px" style={{ backgroundColor: 'var(--text-primary)' }} />
                <span className="block w-4 h-px self-start" style={{ backgroundColor: 'var(--text-primary)' }} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: prefersReduced ? 0 : '100%', opacity: prefersReduced ? 0 : 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: prefersReduced ? 0 : '100%', opacity: prefersReduced ? 0 : 1 }}
            transition={{
              type: 'tween',
              duration: prefersReduced ? 0.15 : 0.32,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-[60] flex flex-col px-6 pt-5 pb-10"
            style={{ backgroundColor: 'var(--bg-surface)' }}
          >
            {/* Overlay header */}
            <div className="flex items-center justify-between">
              <Logo variant="horizontal" />
              <button
                onClick={closeMenu}
                className="flex items-center justify-center w-9 h-9 rounded cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label="Close navigation menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M1 1L15 15M15 1L1 15"
                    stroke="var(--text-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col mt-12" aria-label="Mobile navigation">
              {NAV_LINKS.map(({ label, id }) => (
                <a
                  key={id}
                  href={`/${id}`}
                  onClick={e => { scrollToSection(id, e); closeMenu() }}
                  className="py-5 text-2xl font-semibold tracking-tight border-b transition-colors duration-200"
                  style={{
                    color: 'var(--text-primary)',
                    borderColor: 'var(--border-subtle)',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)' }}
                >
                  {label}
                </a>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="mt-auto">
              <a
                href="/contact"
                onClick={e => {
                  scrollToSection('contact', e)
                  closeMenu()
                  trackEvent('cta_click', { cta_label: 'Book Discovery Call', section: 'navbar' })
                }}
                className="flex items-center justify-center w-full py-4 text-base font-semibold rounded-md cursor-pointer transition-opacity duration-200 hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--navy-dark)' }}
              >
                Book a Discovery Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
