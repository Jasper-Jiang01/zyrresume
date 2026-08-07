import Image from 'next/image'
import { ASSETS, contactCards } from './data'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="sectionTop">
          <span>01 / ABOUT</span>
          <span>WHY CHOOSE ME</span>
        </div>
        <div className="aboutHeader">
          <div>
            <h2>
              关于我<em>UI/UX DESIGN</em>
            </h2>
            <p>福州大学 · 数字媒体艺术设计</p>
          </div>
          <div className="chips">
            <a href="mailto:474005527@qq.com">EMAIL</a>
            <a href="#about">ZHOU</a>
            <a href="#about">YR.</a>
          </div>
        </div>
        <div className="aboutGrid">
          <figure className="portrait">
            <Image src={`${ASSETS}about/portrait.webp`} alt="周依睿" priority width={480} height={600} />
            <Image
              className="floatingAccent"
              src={`${ASSETS}about/about-floating-accent.webp`}
              alt=""
              loading="lazy"
              width={120}
              height={120}
            />
          </figure>
          <div className="aboutInfo">
            <h3>INTRODUCTION</h3>
            <p>
              你好我是周依睿，毕业于福州大学数字媒体艺术，目前在美团大众点评产品设计组负责社区的视觉设计工作，热爱探索不同的视觉风格设计，掌握多种设计工具。
              在工作中我一直尝试新的技术，在工作中能够通过Ai Coding实现可上线的页面代码，通过Ai赋能工作流程；
            </p>
            <div className="aboutContact">
              <h3>CONTACT ME</h3>
              <div className="contactCards">
                {contactCards.map((card) => (
                  <a
                    className={card.featured ? 'contactCard featured' : 'contactCard'}
                    href={card.href}
                    key={card.value}
                  >
                    <Image src={`${ASSETS}${card.icon}`} alt="" loading="lazy" width={32} height={32} />
                    <span>{card.value}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
