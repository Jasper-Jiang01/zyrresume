import Galaxy from './GalaxyClient'

export default function Contact() {
  return (
    <footer className="contactFooter" id="contact">
      <div className="galaxyWrap">
        <Galaxy />
      </div>
      <div className="shell contactInner">
        <div className="sectionTop">
          <span>04 / CONTACT</span>
          <span>YOUR CITY · GMT+8</span>
        </div>
        <p className="available">
          <i /> AVAILABLE FOR FULL-TIME · PROJECTS · CONSULTING
        </p>
        <h2>
          占位标题第一行 <em>占位标题第二行</em>
        </h2>
        <a className="mail" href="mailto:474005527@qq.com">
          474005527@qq.com ↗
        </a>
        <div className="footerBottom">
          <p>在这里写一句欢迎合作/咨询的引导文案。</p>
          <div>
            <a href="#about">DRIBBBLE</a>
            <a href="#about">ZCOOL</a>
          </div>
          <span>© 2026 ZHOU YIRUI</span>
        </div>
      </div>
    </footer>
  )
}
