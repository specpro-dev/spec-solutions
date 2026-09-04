'use client'

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion'

// ─── Data ─────────────────────────────────────────────────────────────────────
const FOUNDERS = [
  {
    initials: 'NU',
    name: 'Nashan Unais',
    role: 'Co-Founder & Frontend Engineer',
    credential: 'Builds production web applications with React and Next.js — focused on clean architecture, TypeScript, and interfaces that perform under real load. Software Engineer at Intervest Software Technologies. BSc Computer Science, University of Westminster (via IIT Sri Lanka).',
    linkedIn: 'https://www.linkedin.com/in/nashan-unais/',
    portfolio: 'https://nashanunais.vercel.app/',
  },
  {
    initials: 'AF',
    name: 'Ashfaq Farleen',
    role: 'Co-Founder & Full Stack Engineer',
    credential: 'Full-stack engineer across React, Node.js, Spring Boot, and .NET — with hands-on experience in automation pipelines, backend services, and freelance delivery. Software Engineer at Aventude. BSc Computer Science, IIT Sri Lanka.',
    linkedIn: 'https://www.linkedin.com/in/ashfaq-farleen/',
    portfolio: 'https://ashfaqfarleen.vercel.app/',
  },
  {
    initials: 'MA',
    name: 'Mohamed Ali Althaf Mohamed',
    role: 'Software Engineer',
    credential: 'ML/computer vision researcher — PyTorch, TensorFlow, React, Node.js. BSc (Hons) Computer Science, University of Westminster (First Class).',
    linkedIn: 'https://www.linkedin.com/in/althaf-ali-dev',
    portfolio: 'https://althafali.vercel.app/',
  },
  {
    initials: 'SM',
    name: 'Saleem Malik',
    role: 'Software Engineer',
    credential: 'Full-stack engineer across Angular, React, Django, Node.js, with applied post-quantum cryptography research. BSc (Hons) Computer Science, University of Westminster.',
    linkedIn: 'https://linkedin.com/in/saleemSE',
    portfolio: 'https://github.com/saleemsgit',
  },
] as const

// ─── Placeholder avatar ────────────────────────────────────────────────────────
function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border"
      style={{
        backgroundColor: 'rgba(200, 151, 47, 0.08)',
        borderColor: 'var(--border-subtle)',
      }}
      aria-hidden="true"
    >
      <span
        className="font-mono text-lg font-bold select-none"
        style={{ color: 'var(--accent)', fontFamily: 'var(--font-jetbrains-mono)' }}
      >
        {initials}
      </span>
    </div>
  )
}

// ─── Link icon ────────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3.5 5.5v5M3.5 3.5v.01M6 5.5v5M6 7.5a2 2 0 0 1 4 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Animation variants ────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

const itemStatic = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }

// ─── Component ────────────────────────────────────────────────────────────────
export default function Team() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="team"
      className="section-padding"
      style={{ backgroundColor: 'var(--bg-base)' }}
      aria-label="Our team"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p
            className="font-mono text-xs tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            &lt; TEAM /&gt;
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold leading-tight mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            The Team
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            One goal: software that does exactly what it was built to do.
          </p>
        </div>

        {/* Founder cards */}
        <LazyMotion features={domAnimation}>
          <m.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl"
            variants={prefersReduced ? {} : container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-8%' }}
          >
            {FOUNDERS.map(({ initials, name, role, credential, linkedIn, portfolio }) => (
              <m.div
                key={name}
                variants={prefersReduced ? itemStatic : item}
                className="card-glow rounded-xl border overflow-hidden flex flex-col"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-subtle)' }}
              >
                {/* Gold top accent */}
                <div
                  className="h-px w-full flex-shrink-0"
                  style={{ background: 'linear-gradient(90deg, var(--accent) 0%, transparent 65%)' }}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-5 p-7">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-4">
                    <Avatar initials={initials} />
                    <div>
                      <p
                        className="font-bold text-base leading-snug"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {name}
                      </p>
                      <p
                        className="text-sm font-medium mt-0.5"
                        style={{ color: 'var(--accent)' }}
                      >
                        {role}
                      </p>
                    </div>
                  </div>

                  {/* Credential */}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {credential}
                  </p>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-1">
                    <a
                      href={linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
                      aria-label={`${name} on LinkedIn`}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                    <span style={{ color: 'var(--border-subtle)' }}>·</span>
                    <a
                      href={portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
                      style={{ color: 'var(--text-muted)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)' }}
                      aria-label={`${name}'s portfolio`}
                    >
                      <ExternalIcon />
                      Portfolio
                    </a>
                  </div>
                </div>
              </m.div>
            ))}
          </m.div>
        </LazyMotion>
      </div>
    </section>
  )
}
