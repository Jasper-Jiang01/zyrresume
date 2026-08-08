import Link from 'next/link'

export const metadata = {
  title: '页面未找到 · 周依睿',
}

export default function NotFound() {
  return (
    <main className="notFound">
      <div className="shell notFoundInner">
        <span className="notFoundCode">404</span>
        <h1>页面走丢了</h1>
        <p>你访问的页面不存在，或已被移动。</p>
        <Link className="notFoundLink" href="/">
          ← 返回首页
        </Link>
      </div>
    </main>
  )
}
