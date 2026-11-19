'use client'

import { useRef, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function ScrollProgressLine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 35%'] })
  const scaleY = useTransform(scrollYProgress, p => (prefersReduced ? 1 : p))

  return (
    <div className="relative" ref={ref}>
      <div className="absolute top-1.5 bottom-1.5 left-4 w-px pointer-events-none bg-border-subtle" aria-hidden="true" />
      <m.div
        className="absolute top-1.5 left-4 w-px h-[calc(100%-0.375rem)] pointer-events-none origin-top bg-accent"
        style={{ scaleY }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
