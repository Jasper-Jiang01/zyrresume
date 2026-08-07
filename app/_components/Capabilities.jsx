import { capabilities } from './data'

export default function Capabilities() {
  return (
    <section className="section capabilities" id="capabilities">
      <div className="shell">
        <div className="sectionTop">
          <span>03 / CAPABILITIES</span>
          <span>HOW I CREATE VALUE</span>
        </div>
        <h2>
          从方向<em>到交付</em>
        </h2>
        <p className="capIntro">
          不仅定义设计，也确保它真实发生。
          <span>
            I define the direction, build the system,
            <br />
            and stay until it ships.
          </span>
        </p>
        <div className="capGrid">
          {capabilities.map((item, i) => (
            <article key={item.title}>
              <span>0{i + 1}</span>
              <b>✦</b>
              <h3>{item.title}</h3>
              <h4>CAPABILITY {item.en}</h4>
              <p>占位描述文字，介绍该项能力具体包含什么内容。</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
