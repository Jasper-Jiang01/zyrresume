import { ASSETS } from './data'
import ColorBends from './ColorBends'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="heroBends">
        <ColorBends
          colors={['#7B5FFF']}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.5}
          iterations={1}
          intensity={1.5}
          bandWidth={6}
          transparent
        />
      </div>
      <div className="shell heroInner">
        <h1>
          <span style={{color: '#ffffff', wordSpacing: '.2em'}}>DESIGN  PRODUCTS</span><em style={{color: '#7B5FFF', wordSpacing: '.2em'}}>THAT  PEOPLE</em>
        </h1>
        <p className="heroSub">
          你好，我是周依睿，一名UI设计师，始终热爱着打造兼具美感与实用性的数字产品体验。
        </p>
        <a className="heroButton" href="#work">
          Explore selected work <b>→</b>
        </a>
        <div className="heroGallery">
          {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((n, i) => (
            <img
              key={i}
              src={`${ASSETS}hero-cover/placeholder-${n}.png`}
              alt="作品展示"
            />
          ))}
        </div>
        <div className="heroBenefits">
          <div>
            <b>Product Strategy</b>
            <span>从模糊需求到清晰的产品方向定义。</span>
          </div>
          <div>
            <b>Interaction & Motion</b>
            <span>让界面响应灵敏、流畅且富有生命力。</span>
          </div>
          <div>
            <b>Visual Systems</b>
            <span>构建可延展的独特设计语言体系。</span>
          </div>
        </div>
      </div>
    </section>
  )
}
