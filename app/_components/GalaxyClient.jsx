'use client'

import dynamic from 'next/dynamic'

// `next/dynamic` 的 `ssr: false` 只能在客户端组件中使用，
// 因此把它单独包一层，让 Contact 本身可以继续作为服务端组件。
const Galaxy = dynamic(() => import('./Galaxy'), { ssr: false })

export default Galaxy
