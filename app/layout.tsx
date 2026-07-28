import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: '/web-avatar.png',
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
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
