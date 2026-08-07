import Image from 'next/image'
import { ASSETS, navLinks } from './data'

export default function Nav() {
  return (
    <header className="navWrap">
      <nav className="nav">
        <a href="#home" className="brand">
          <Image src={`${ASSETS}about/avatar.webp`} alt="周依睿" priority width={40} height={40} />
          <span>
            <b>周依睿</b>
            <em>Zhou Yirui</em>
          </span>
        </a>
        <div className="navLinks">
          {navLinks.map(([name, href]) => (
            <a key={href} href={href}>
              {name}
            </a>
          ))}
        </div>
        <a className="pill" href="#contact">
          <i />
          Let&apos;s talk <span>↗</span>
        </a>
      </nav>
    </header>
  )
}
