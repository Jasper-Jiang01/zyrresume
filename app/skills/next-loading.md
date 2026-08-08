# 数字加载动画

## 实现效果

页面加载时显示全屏覆盖层，中间显示从 0 到 100 的百分比数字，使用 ease-out 缓动实现自然减速效果，到达 100 后淡出隐藏。

## 文件位置

```
app/_components/Loading.tsx
```

## 使用方式

```tsx
// app/layout.tsx 或 app/page.tsx
import Loading from "@/app/_components/Loading";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <Loading />
        {children}
      </body>
    </html>
  );
}
```

## 核心实现

### 1. Ease-out 缓动函数

```ts
const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);
```

- `t`: 0~1 的进度（时间/总时长）
- 三次方缓动：开始快，结尾自然减速
- 比线性变化更有「到达」的仪式感

### 2. requestAnimationFrame 驱动

```ts
const tick = (timestamp: number) => {
  if (!start) start = timestamp;
  const elapsed = timestamp - start;
  const t = Math.min(elapsed / DURATION, 1);
  setProgress(Math.round(EASE_OUT(t) * 100));
  if (t < 1) raf = requestAnimationFrame(tick);
};
```

- `requestAnimationFrame` 与浏览器刷新率同步，比 `setInterval` 更流畅
- `timestamp` 来自 RAF 回调，高精度时间戳
- leanup 时 `cancelAnimationFrame` 防止内存泄漏

### 3. 淡出过渡

```tsx
<div className="... transition-opacity duration-300" style={{ opacity: progress >= 100 ? 0 : 1 }}>
```

- 到达 100% 后触发 opacity 变化
- CSS transition 处理 300ms 淡出
- 淡出完成后 `setVisible(false)` 移除 DOM

## 可配置参数

| 参数 | 当前值 | 说明 |
|------|--------|------|
| `DURATION` | 2000ms | 计数总时长 |
| `EASE_OUT` | cubic | 缓动函数 |
| 字号 | `text-6xl sm:text-7xl` | 响应式字号 |
| 淡出延迟 | 300ms | 到达 100 后等待时间 |

## 注意事项

- **客户端组件**：必须使用 `"use client"`，依赖 `useState` / `useEffect`
- **`tabular-nums`**：使数字等宽，避免跳动时布局抖动
- **z-index**：`z-50` 确保覆盖所有页面内容
- **可访问性**：`aria-hidden` 隐藏于辅助技术

## 参考

灵感来源：[Guangxi Cai](https://www.caiguangxi.com/) 的数字加载效果。
