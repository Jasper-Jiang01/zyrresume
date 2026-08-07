import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google'
import { BASE_PATH } from '../site.config.mjs'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-jakarta',
})

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500'],
  style: ['italic'],
  display: 'swap',
  variable: '--font-serif',
})

const siteUrl = 'https://jiang-zyr.github.io/zyrresume'

// icons.icon 渲染为相对站点根的 <link href>，不经过 metadataBase 解析，需要手动带 BASE_PATH。
const iconUrl = `${BASE_PATH}/web-avatar.webp`
// openGraph/twitter 的图片会基于 metadataBase（已含 BASE_PATH）解析成绝对地址，
// 这里只需要提供相对路径，不能再重复拼接 BASE_PATH，否则路径会重复。
const ogImageUrl = '/web-avatar.webp'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: iconUrl,
  },
  title: '周依睿 · UI/UX Designer',
  description:
    '周依睿的 UI/UX 设计作品集。专注用户体验设计，从产品策略到视觉交付。',
  openGraph: {
    title: '周依睿 · UI/UX Designer',
    description: '周依睿的 UI/UX 设计作品集。专注用户体验设计，从产品策略到视觉交付。',
    url: siteUrl,
    siteName: '周依睿 Portfolio',
    images: [
      {
        url: ogImageUrl,
        width: 800,
        height: 800,
        alt: '周依睿 · UI/UX Designer',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '周依睿 · UI/UX Designer',
    description: '周依睿的 UI/UX 设计作品集。专注用户体验设计，从产品策略到视觉交付。',
    images: [ogImageUrl],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${jakarta.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  )
}
