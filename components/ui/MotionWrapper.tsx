'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  /** Delay in seconds before animation starts */
  delay?: number
  /** Animation style — default fades up */
  variant?: 'fadeUp' | 'fadeIn' | 'scaleIn'
}

// Animations only use opacity and transform (translateY/scale).
// These are compositor-only properties — they never cause layout recalculations.
// whileInView fires once per element thanks to triggerOnce (viewport={once:true}).

const variants = {
  hidden: {
    fadeUp: { opacity: 0, y: 24 },
    fadeIn: { opacity: 0 },
    scaleIn: { opacity: 0, scale: 0.95 },
  },
  visible: {
    fadeUp: { opacity: 1, y: 0 },
    fadeIn: { opacity: 1 },
    scaleIn: { opacity: 1, scale: 1 },
  },
}

export default function MotionWrapper({
  children,
  className,
  delay = 0,
  variant = 'fadeUp',
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion()

  // If user has prefers-reduced-motion enabled, render children with no animation.
  // This is a full bail-out — no opacity transition, no transform at all.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={variants.hidden[variant]}
      whileInView={variants.visible[variant]}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
