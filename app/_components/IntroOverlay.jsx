'use client'

import { useEffect, useState } from 'react'
import { useCursorAura } from './useCursorAura'
import IntroCurtain from './IntroCurtain'

export default function IntroOverlay() {
  const [intro, setIntro] = useState(true)
  useCursorAura()

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {intro && <IntroCurtain />}
      <div className="cursorAura" />
    </>
  )
}
