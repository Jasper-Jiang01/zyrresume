import IntroOverlay from './_components/IntroOverlay'
import Nav from './_components/Nav'
import Hero from './_components/Hero'
import About from './_components/About'
import Work from './_components/Work'
import Capabilities from './_components/Capabilities'
import Contact from './_components/Contact'

export default function HomePage() {
  return (
    <>
      <IntroOverlay />
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
