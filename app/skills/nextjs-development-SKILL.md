---
name: nextjs-development
description: 使用 Next.js（优先 App Router）开发、改造、排查或评审 Web 应用的工作流。凡是用户要求新建 Next.js 项目、实现页面/路由/API、动态路由、Server/Client Component、服务端数据获取、缓存与 ISR、Route Handler、Server Action、表单、Proxy（原 Middleware）、Prisma、环境变量、next/image 或 Next.js 性能与 SEO 时都应使用。即使用户只说“在 app 目录加页面”“Next 项目接口报错”“把 React 页面迁到 Next”也应加载本技能；纯 React/Vite 项目且不涉及 Next.js 时不要使用。
compatibility: Requires local filesystem and shell access. Use the workspace and its existing package manager; do not install or deploy unless requested.
---

# Next.js 开发工作流

## 目标与默认原则

以课程笔记中的 App Router 约定为默认实现方式。先阅读现有 `package.json`、`app/`、`next.config.*` 和相关文件，沿用项目现有的 Next.js 版本、包管理器、样式方案与代码规范。不要把 Pages Router 与 App Router 的写法混用；除非项目已经使用 `pages/`，否则优先使用 App Router。

优先让组件保持为服务端组件。只有需要 React Hook、浏览器 API 或事件处理器时，才把最小的交互边界拆成客户端组件并在该文件首行加入 `'use client'`。不要为了一个按钮或输入框把整个页面变成客户端组件。

任何改动都应先确认现有实现，再做最小且完整的修改。涉及接口、数据库、认证、缓存或跨文件改造时，列出清晰任务并在完成后进行适合该项目的检查，例如类型检查、lint、测试或构建。不要擅自部署、提交或暴露环境变量。

## 新建项目

仅在用户明确要求创建项目，且目标目录不存在或可安全使用时执行。优先采用项目当前包管理器；没有既有偏好时可以使用：

```bash
pnpm create next-app@latest my-app --yes
cd my-app
pnpm dev
```

`--yes` 使用默认配置：TypeScript、Tailwind CSS、App Router、Turbopack 及 `@/*` 导入别名。若用户需要自定义数据库、目录、ESLint 或无 Tailwind 设置，使用交互式 `create-next-app`，不要假定选项。

推荐的通用结构是：`app/` 放置路由页面与 Route Handler，`components/` 放共享 UI，`lib/` 或 `utils/` 放置服务端工具、客户端实例和纯函数，`hooks/` 放客户端自定义 Hook。遵循已有项目结构优先于此建议。

## App Router 路由

App Router 使用文件系统路由。`app/layout.tsx` 是根布局且必须保留；`page.tsx` 才会使所在目录成为可访问页面；每一层的 `layout.tsx` 自动包裹该层及子层页面。不要重命名这些约定文件。

使用 `[id]`、`[slug]` 创建动态路径。对于 Next.js 15+，`params` 和 `searchParams` 是 Promise，应在异步页面中等待它们：

```tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <main>Product: {id}</main>
}
```

同样将 `searchParams` 标记为 Promise 并 `await` 后读取。若仓库版本较旧，先检查现有页面的类型模式并保持一致，避免无根据地强制升级。

以下文件和目录用于组织与状态：`loading.tsx` 提供加载 UI，`error.tsx` 捕获路由段错误且必须是客户端组件，`not-found.tsx` 定义 404 UI，使用 `notFound()` 表示查无数据。`_components` 等下划线目录不参与路由，`(marketing)` 等路由组仅组织文件且不会出现在 URL 中。使用 `next/link` 做链接导航；仅在客户端组件中通过 `next/navigation` 的 `useRouter()` 进行编程导航。

不要让同一路由目录同时存在 `page.tsx` 和 `route.ts`，应为接口另建路径。

## 服务端组件与客户端组件

默认组件是服务端组件。它适合：安全访问数据库或私有环境变量、服务端获取数据、降低浏览器 JavaScript 体积和输出首屏 HTML。

将交互拆到客户端组件。只有在该组件需要 `useState`、`useEffect`、`useRef` 等 Hook，事件处理器，或 `window`、`document`、`localStorage` 等浏览器 API 时，才写：

```tsx
'use client'

import { useState } from 'react'

export function QuantityPicker() {
  const [quantity, setQuantity] = useState(1)
  return <button onClick={() => setQuantity((value) => value + 1)}>{quantity}</button>
}
```

`'use client'` 表示该边界需要发送 JavaScript 并在浏览器水合，不等于“没有服务端渲染”。客户端组件不能直接安全调用数据库或读取私密环境变量；把这些逻辑放到服务端组件、Server Action 或 Route Handler。

## 数据获取、渲染与缓存

在服务端组件中优先使用原生 `fetch` 或服务端数据库/ORM 调用。`fetch` 可以利用 Next.js 的缓存与请求去重能力。生产和开发环境的缓存行为可能不同，缓存问题应使用生产构建或项目既有验证流程确认。

明确选择缓存策略，不要靠猜测：默认静态页面适合长期不变内容；由 `params`、`searchParams`、`cookies()` 或 `headers()` 驱动的数据通常需要动态渲染。可按需要使用：

```ts
await fetch(url, { cache: 'force-cache' })
await fetch(url, { next: { revalidate: 60, tags: ['posts'] } })
```

需要写入后刷新时，根据体验选择：`revalidateTag()` 让已有缓存可先返回并后台更新，`updateTag()` 适合 Server Action 的写后立即读取，`revalidatePath()` 适合按页面或布局失效。对非 `fetch` 的异步查询可在适用版本和现有项目模式下使用 `unstable_cache()`。

如果项目开启 `cacheComponents: true`，需要格外检查：`'use cache'` 只能在服务端使用，不能与 `cookies`、`headers`、`params`、`searchParams` 这类运行时值混用；慢异步部分应置于 React `<Suspense>` 边界内；将 `new Date()`、`Math.random()` 等不可预测值留在客户端或明确的动态路径。不要在未确认配置与版本支持时盲目引入这些实验性/版本相关 API。

## Route Handlers

HTTP 接口使用 `route.ts`，文件可以在 `app/` 下任一路由段，常见位置是 `app/api/.../route.ts`。只导出正确名称的异步 HTTP 方法，例如 `GET`、`POST`、`PUT`、`DELETE`、`OPTIONS`：

```ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get('page') ?? '1'
  return NextResponse.json({ page })
}

export async function POST(request: Request) {
  const body = await request.json()
  return Response.json({ received: body }, { status: 201 })
}
```

使用 `new URL(request.url).searchParams` 或 `NextRequest.nextUrl.searchParams` 读取查询参数，使用 `await request.json()` 读取 JSON 请求体。需要 cookie、重定向、rewrite 等扩展能力时使用 `NextResponse`。对内部页面表单提交优先考虑 Server Action；对第三方回调、外部客户端或需要独立 HTTP 契约的能力使用 Route Handler。

## Server Actions 与表单

Server Action 必须是异步服务端函数。可在独立服务端模块文件顶部加 `'use server'`，或在函数体内加该指令；不要在客户端组件内部定义它。客户端组件可导入并调用独立定义的 Action。

```ts
// app/actions/create-post.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  if (!title) throw new Error('Title is required')

  // 在这里执行服务端写入与授权校验
  revalidatePath('/posts')
}
```

将 Action 传给 `<form action={createPost}>` 实现渐进增强。写入前验证输入、授权当前用户、处理预期错误；不得信任来自浏览器的 ID、角色或价格。若需要表单的交互状态，把表单 UI 拆为客户端组件，不要把敏感服务端逻辑移到浏览器。

## Proxy、环境变量与认证边界

在 Next.js 16 及以上，课程采用 `proxy.ts`（替代旧称 Middleware）；文件位于项目根目录并导出 `proxy` 函数。每个项目只应有一个。通过 `config.matcher` 限定需要拦截的路径，避免拦截静态资源：

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const signedIn = false // 从安全会话来源读取
  if (!signedIn) return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*'] }
```

若项目仍使用 `middleware.ts` 或较早版本，延续现有约定而不要无提示迁移。Proxy 适合做轻量路由守卫、重定向和请求级处理，不应替代所有数据库授权；关键写入与读取仍需在服务端再次鉴权。

私有变量使用大写蛇形命名且不得在客户端模块引用，例如 `DATABASE_URL`、`JWT_SECRET`。只有明确可公开的构建时变量才使用 `NEXT_PUBLIC_` 前缀。永远不要为解决客户端报错而把密钥改为 `NEXT_PUBLIC_`。

## Prisma 与数据库

仅在用户明确选择 Prisma 且仓库已有或需要配置它时使用。Prisma Client 只能在服务端组件、Server Action、Route Handler 或其他服务端代码运行，绝不能导入客户端组件。开发环境应复用单例，防止热更新产生多个连接：

```ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

修改 Schema 前先读取现有 `prisma/schema.prisma` 与迁移历史。执行迁移、生成客户端或修改数据库属于有副作用操作，应仅在用户请求或明确批准时执行。所有数据库读取与写入要做参数校验、授权和错误处理。

## 样式、图片、元数据与性能

沿用项目既有样式系统。课程建议组件使用 CSS Modules，也支持 Tailwind、Sass/SCSS；CSS-in-JS 通常需要客户端边界。避免无必要的全局样式污染。

使用 `next/image` 处理需要优化的图片，提供 `width` 和 `height`，或在尺寸已确定的父容器中使用 `fill`。静态资源路径 `/image.png` 对应 `public/image.png`。外部图片需要先核对 `next.config.*` 的远程图片配置。不要把原生 `<img>` 一律替换掉；在需要 Next 图片优化时再转换。

为公开页面提供适当的 `metadata` 或 `generateMetadata`，明确标题、描述和社交分享信息；动态元数据必须避免泄露私有数据。性能优化优先顺序是：保留服务端边界、减少客户端组件树、设置恰当缓存、为慢内容提供 `loading.tsx` 或 `<Suspense>`、优化图片，然后再根据真实指标处理代码拆分与预加载。

## 交付与检查

完成任务时，说明改动了哪些文件、为何选择服务端/客户端边界，以及缓存或授权行为。运行项目可用的最相关检查：例如 `pnpm lint`、`pnpm test`、`pnpm build`。若检查因既有问题失败，清楚区分新增问题与已有问题。

在代码评审或故障排查中，优先检查这些高频错误：App Router 特殊文件命名错误；Next 15+ 未 `await params/searchParams`；服务端组件使用 Hook/事件；大范围滥用 `'use client'`；客户端泄露私有环境变量或 Prisma；`page.tsx` 与 `route.ts` 同目录冲突；Server Action 缺少异步/授权/输入验证；缓存失效策略与写入后的用户体验不匹配；`error.tsx` 缺少 `'use client'`；图片缺少确定尺寸；Proxy 文件位置、导出或 matcher 不正确。
