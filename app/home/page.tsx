'use client'

import { useEffect, useState } from 'react'
import { useCursorAura } from './_components/useCursorAura'
import IntroCurtain from './_components/IntroCurtain'
import Nav from './_components/Nav'
import Hero from './_components/Hero'
import About from './_components/About'
import Work from './_components/Work'
import Capabilities from './_components/Capabilities'
import Contact from './_components/Contact'

export default function HomePage() {
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
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Capabilities />
        <Contact />
      </main>
    </>
  )
}
