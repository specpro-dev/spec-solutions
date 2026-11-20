'use client'

import { LazyMotion, MotionConfig, domAnimation, m, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

/** Lets every `m.*` component load features once and respect prefers-reduced-motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

interface Props {
  children: ReactNode
  className?: string
  as?: 'div' | 'ol' | 'ul' | 'li'
}

function Trigger({ variants, children, className, as = 'div' }: Props & { variants: Variants }) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </Tag>
  )
}

export function Reveal(props: Props) {
  return <Trigger {...props} variants={item} />
}

/** Staggers its RevealItem children. */
export function RevealGroup(props: Props) {
  return <Trigger {...props} variants={group} />
}

export function RevealItem({ children, className, as = 'div' }: Props) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  )
}
