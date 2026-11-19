'use client'

import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'framer-motion'
import 'lenis/dist/lenis.css'

export default function SmoothScroll() {
  if (useReducedMotion()) return null
  return <ReactLenis root options={{ lerp: 0.1 }} />
}
