import Image from 'next/image'
import { BASE_PATH } from '../../site.config.mjs'

// 每张图的真实像素宽高，用于让 next/image 按各自实际比例渲染，
// 避免因统一写死宽高比导致的图片拉伸变形或布局跳动。
const images = [
  { src: '1.png', width: 7680, height: 13200 },
  { src: '2.png', width: 7680, height: 4320 },
  { src: '3.png', width: 5760, height: 3240 },
  { src: '4.png', width: 5760, height: 3240 },
  { src: '5.png', width: 5760, height: 3240 },
  { src: '6.png', width: 5760, height: 3240 },
  { src: '7.png', width: 7680, height: 4320 },
  { src: '8.png', width: 5760, height: 3240 },
  { src: '9.png', width: 5760, height: 3240 },
]

/**
 * 日常产出
 * @returns 日常产出
 */
export default function RegularProject() {
  return (
    <main className="regularProject">
      <div className="shell">
        <h1 className="regularProjectTitle">日常产出</h1>
        <div className="regularProjectList">
          {images.map(({ src, width, height }, i) => (
            <Image
              key={src}
              className="regularProjectImg"
              src={`${BASE_PATH}/regularProject/${src}`}
              alt={`日常产出 ${i + 1}`}
              width={width}
              height={height}
              sizes="(max-width: 900px) 100vw, 1240px"
              priority={i === 0}
              loading={i === 0 ? undefined : 'lazy'}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
