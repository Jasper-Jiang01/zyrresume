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
            <img src={`${ASSETS}about/portrait.webp`} alt="周依睿" fetchPriority="high" width="480" height="600" />
            <img
              className="floatingAccent"
              src={`${ASSETS}about/about-floating-accent.webp`}
              alt=""
              loading="lazy"
              width="120"
              height="120"
            />
          </figure>
          <div className="aboutInfo">
            <h3>INTRODUCTION</h3>
            <p>
              我是一名专注于 UI/UX 设计的设计师，致力于以用户体验为核心，打造兼具美感与实用性的数字产品体验。擅长从 0 到 1 的产品设计，关注细节与系统化思维。
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
                    <img src={`${ASSETS}${card.icon}`} alt="" loading="lazy" width="32" height="32" />
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
