import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BASE_PATH } from '../../site.config.mjs'

export const metadata: Metadata = {
  title: '日常产出 · 周依睿',
  description: '周依睿的日常设计产出合集，记录平日练习与视觉探索。',
  openGraph: {
    title: '日常产出 · 周依睿',
    description: '周依睿的日常设计产出合集，记录平日练习与视觉探索。',
    images: ['/web-avatar.webp'],
  },
  twitter: {
    card: 'summary',
    title: '日常产出 · 周依睿',
    description: '周依睿的日常设计产出合集，记录平日练习与视觉探索。',
    images: ['/web-avatar.webp'],
  },
}

// 原图是 5760~7680px 宽的未压缩 PNG（单张最大 18.6MB，9 张合计约 51MB）。
// 页面实际展示宽度最大只有 1240px 容器，因此统一缩放到 2000px 宽并转为 WebP，
// 体积降至约 780KB（压缩比约 65 倍），宽高比保持不变，避免布局跳动。
const images = [
  { src: '1.webp', width: 1163, height: 2000 },
  { src: '2.webp', width: 2000, height: 1125 },
  { src: '3.webp', width: 2000, height: 1125 },
  { src: '4.webp', width: 2000, height: 1125 },
  { src: '5.webp', width: 2000, height: 1125 },
  { src: '6.webp', width: 2000, height: 1125 },
  { src: '7.webp', width: 2000, height: 1125 },
  { src: '8.webp', width: 2000, height: 1125 },
  { src: '9.webp', width: 2000, height: 1125 },
]

/**
 * 日常产出
 * @returns 日常产出
 */
export default function RegularProject() {
  return (
    <main className="regularProject">
      <div className="shell">
        <Link className="regularProjectBack" href="/">
          ← 返回首页
        </Link>
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
