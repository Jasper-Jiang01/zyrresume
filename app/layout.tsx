import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google'
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

export const metadata: Metadata = {
  icons: {
    icon: '/web-avatar.webp',
  },
  title: '周依睿 · UI/UX Designer',
  description:
    '周依睿的 UI/UX 设计作品集。专注用户体验设计，从产品策略到视觉交付。',
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
