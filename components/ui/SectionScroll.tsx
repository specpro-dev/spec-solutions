'use client'

import { useEffect } from 'react'
import { sectionFromPath } from '@/config/sections'

/** On the home page, opened at a section URL like /services: start at that section. */
export default function SectionScroll() {
  useEffect(() => {
    const id = sectionFromPath(location.pathname)
    // A native jump: Lenis picks the new position up from the scroll event.
    if (id) document.getElementById(id)?.scrollIntoView()
  }, [])

  return null
}
