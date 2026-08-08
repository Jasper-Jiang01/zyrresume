import Image from 'next/image'
import { ASSETS } from './data'
import ColorBends from './ColorBendsClient'
import FoldText from './FoldText'
import StarBorder from './StarBorder'

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
          <FoldText
            text="DESIGN PRODUCTS"
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.7}
            stagger={0.03}
            ease="power3.out"
            perspective={600}
            creaseShading={0.5}
            className="heroTitleLight heroFold"
            color="#ffffff"
            fontSize="inherit"
            fontWeight="inherit"
          />
          <FoldText
            text="THAT PEOPLE"
            splitBy="char"
            hinge="bottom"
            trigger="mount"
            duration={0.7}
            stagger={0.03}
            ease="power3.out"
            perspective={600}
            creaseShading={0.5}
            className="heroTitleAccent heroFold heroFoldEm"
            color="#7B5FFF"
            fontSize="inherit"
            fontWeight="inherit"
          />
        </h1>
        <p className="heroSub">
          你好！我是周依睿，我目前在美团担任UI视觉设计师，我始终热爱并追求着视觉语言的设计与探索。
        </p>
        <StarBorder
          as="a"
          href="#work"
          className="heroButtonStar"
          color="#7B5FFF"
          speed="4s"
          thickness={2}
        >
          Explore selected work <b>→</b>
        </StarBorder>
        <div className="heroGallery">
          {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2].map((n, i) => (
            <Image
              key={i}
              src={`${ASSETS}page${n}.webp`}
              alt="作品展示"
              priority={i < 2}
              loading={i < 2 ? undefined : 'lazy'}
              width={360}
              height={203}
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
