'use client'

import { useEffect, useState } from 'react'
import { useCursorAura } from './home/_components/useCursorAura'
import IntroCurtain from './home/_components/IntroCurtain'
import Nav from './home/_components/Nav'
import Hero from './home/_components/Hero'
import About from './home/_components/About'
import Work from './home/_components/Work'
import Capabilities from './home/_components/Capabilities'
import Contact from './home/_components/Contact'

export default function HomePage() {
  const [intro, setIntro] = useState(true)
  useCursorAura()

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 1450)
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
