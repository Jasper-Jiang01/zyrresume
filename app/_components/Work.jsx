import Image from 'next/image'
import Link from 'next/link'
import { ASSETS, projects } from './data'

export default function Work() {
  return (
    <section className="section work" id="work">
      <div className="shell">
        <div className="sectionTop">
          <span>02 / SELECTED WORK</span>
          <span>2025—2026</span>
        </div>
        <div className="workTitle">
          <div>
            <p className="sectionKicker">
              <i /> CASE STUDIES
            </p>
            <h2>
              项目目录<em>Design that drives outcomes</em>
            </h2>
          </div>
          <a href="#contact">Discuss a project ↗</a>
        </div>
        <div className="projectList">
          {projects.map((p) => {
            const content = (
              <>
                <div className="projectCoverWrap">
                  <Image
                    className="projectCover"
                    src={`${ASSETS}${p.cover}`}
                    alt={`${p.name}封面`}
                    loading="lazy"
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 900px) 50vw, 40vw"
                  />
                </div>
                <div className="projectContent">
                  <span>{p.no}</span>
                  <div>
                    <h3>{p.name}</h3>
                    <div className="tags">
                      <i>{p.type}</i>
                      <i>{p.role}</i>
                      <i>{p.result}</i>
                    </div>
                  </div>
                </div>
              </>
            )

            return p.href ? (
              <Link className="project" href={p.href} key={p.no}>
                {content}
              </Link>
            ) : (
              <article className="project" key={p.no}>
                {content}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
