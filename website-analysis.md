# 开到茶花（Kaidaochahua）作品集网站 — 适配逻辑与样式分析

> 源站：https://kaidaochahua-commits.github.io/#about
> 技术栈：Next.js (RSC) + Tailwind CSS v4 + Three.js

---

## 一、响应式断点设计（Breakpoints）

网站采用 **Mobile First + -desktop** 策略，使用 `max-width` 向下适配：

| 断点名称 | CSS 条件 | 目标设备 |
|---------|----------|---------|
| 桌面端（默认） | `> 900px` | 大屏桌面 |
| 平板端 | `width <= 900px` | 平板 / 小屏笔记本 |
| 小平板 | `width <= 700px` | 竖屏平板 |
| 手机端 | `width <= 560px` | 手机 |

**关键规律**：
- 所有 "@media" 查询均使用 **range syntax**（CSS Media Queries Level 4）：`(width <= 900px)`
- 适配时优先缩减间距、字号、隐藏次要元素，而非改变整体结构

---

## 二、布局系统（Shell Container）

### 2.1 居中容器

```css
.shell {
  width: min(1240px, 100% - 96px);  /* 桌面：最大1240px，两侧各留48px */
  margin: 0 auto;
}

/* <= 900px */
@media (width <= 900px) {
  .shell {
    width: calc(100% - 38px);  /* 两侧各留19px */
  }
}
```

### 2.2 Section 间距

```css
.section { padding: 130px 0; }      /* 桌面 */
@media (width <= 900px) {
  .section { padding: 85px 0; }    /* 平板 */
}
```

---

## 三、色彩系统（CSS Custom Properties）

```css
:root {
  --ink:      #050606;    /* 主背景色（近黑） */
  --surface:  #0a0c0d;    /* 次级背景 */
  --paper:    #e9e6df;    /* 主文字/浅色 */
  --acid:     #f47b43;    /* 强调色（橙色） */
  --ice:      #9fc7d9;    /* 次要强调（冰蓝） */
  --line:     #c4d7df24;  /* 分割线 */
  --muted:    #828988;    /* 次要文字 */
  --mouse-x:  50vw;       /* 鼠标光晕 X（JS 动态更新） */
  --mouse-y:  50vh;       /* 鼠标光晕 Y */
}
```

**设计哲学**：深色基调 + 暖橙强调 + 冷蓝辅助，形成高对比度视觉张力。

---

## 四、字体系统

### 4.1 字体族

| 用途 | 字体 | 引用方式 |
|------|------|---------|
| 正文/UI | Plus Jakarta Sans (200-800) | `--font-jakarta` |
| 编辑标题 | Cormorant Garamond Italic (500) | `--font-serif` |
| 中文回退 | PingFang SC, Microsoft YaHei | system-ui fallback |

### 4.2 字号策略（clamp 响应式）

```css
/* 主标题 */
.heroCopy h1 {
  font-size: clamp(82px, 8.2vw, 140px);  /* 最小82px，首选8.2vw，最大140px */
}

/* Subtitle */
.heroRole {
  font-size: clamp(28px, 2.4vw, 42px);
}

/* Section 大标题 */
.workHeading h2 {
  font-size: clamp(58px, 6vw, 106px);
}

/* About 标题 */
.aboutCopy h2 {
  font-size: clamp(52px, 5vw, 86px);
}
```

### 4.3 缩放到固定值断点

```css
/* 手机端用 vw 替代 clamp */
@media (width <= 900px) {
  .heroCopy h1 { font-size: 17vw; }
}
@media (width <= 560px) {
  .heroCopy h1 { font-size: 18vw; }
  .workHeading h2 { font-size: 15vw; }
  .contact h2 { font-size: 16vw; }
}
```

---

## 五、Hero 区域（首屏）

### 5.1 结构层次（z-index 堆叠）

```
z-index 0:  meshCanvas (Three.js 背景)
z-index 1:  meshVeil (遮罩层)
z-index 3:  softBlock (装饰方块)
z-index 4:  gradientSphere (渐变球)
z-index 5:  fineRing (细环)
z-index 6:  heroCopy (文案内容)
z-index 8:  heroTech (底部技术条)
z-index 100: nav (固定导航)
```

### 5.2 导航栏（Glass Morphism）

```css
.nav {
  z-index: 100;
  backdrop-filter: blur(22px) saturate(135%);
  background: linear-gradient(120deg, rgba(16,15,33,0.7), rgba(8,8,19,0.46));
  border: 1px solid rgba(199,198,240,0.14);
  border-radius: 18px;
  height: 64px;
  padding: 0 20px;
  position: fixed;
  top: 16px;
  left: 50%;
  transform: translate(-50%);
  box-shadow: 0 16px 50px rgba(0,0,0,0.28), inset 0 1px rgba(255,255,255,0.05);
}
```

**适配**：

```css
/* <= 900px: 隐藏导航 links，仅保留 logo + contact pill */
@media (width <= 900px) {
  .nav nav { display: none; }
  .hero   { min-height: 720px; }
}

/* <= 560px: 缩小导航高度 */
@media (width <= 560px) {
  .nav { height: 58px; top: 12px; }
}
```

### 5.3 装饰元素响应式

```css
/* 渐变球 */
.gradientSphere {
  width: min(38vw, 540px);
  aspect-ratio: 1;
  border-radius: 50%;
  top: 20%;
  right: 10%;
}

@media (width <= 900px) {
  .gradientSphere { width: min(55vw, 480px); top: 22%; right: -2%; }
}

@media (width <= 560px) {
  .gradientSphere { width: 78vw; top: 14%; right: -22vw; }
}
```

---

## 六、About 区域

### 6.1 网格布局

```css
/* 桌面：左侧肖像 0.8fr + 右侧文案 1.2fr */
.aboutGrid {
  grid-template-columns: minmax(360px, 0.8fr) 1.2fr;
  gap: 9vw;
  padding: 95px 0 105px;
}

/* <= 900px: 单列堆叠 */
@media (width <= 900px) {
  .aboutGrid {
    grid-template-columns: 1fr;
    gap: 45px;
    padding: 60px 0;
  }
  .portrait { height: 520px; }  /* 桌面 640px → 平板 520px */
}

/* <= 560px: 更紧凑 */
@media (width <= 560px) {
  .portrait { height: 440px; }
}
```

### 6.2 Stats 统计栏

```css
.stats {
  grid-template-columns: repeat(4, 1fr);  /* 桌面：4列 */
}

/* <= 900px: 2列 */
@media (width <= 900px) {
  .stats { grid-template-columns: 1fr 1fr; }
  .stats > div:nth-child(2) { border-right: 0; }
}
```

---

## 七、Projects 项目展示

### 7.1 网格布局

```css
.projects {
  grid-template-columns: repeat(2, minmax(0, 1fr));  /* 桌面：2列 */
  gap: 100px 24px;  /* 行间距100px，列间距24px */
  align-items: start;
}

/* 交错效果：偶数项下移，第3项微调 */
.project:nth-child(2n)   { margin-top: 90px; }
.project:nth-child(3)    { margin-top: -25px; }
```

### 7.2 适配策略

```css
/* <= 900px */
@media (width <= 900px) {
  .projects { gap: 70px 14px; }
  .device  { border-width: 3px; width: 38%; }
}

/* <= 560px: 单列，取消交错 */
@media (width <= 560px) {
  .projects { grid-template-columns: 1fr; row-gap: 55px; }
  .project:nth-child(2n),
  .project:nth-child(3) { margin-top: 0; }
}
```

---

## 八、Capabilities 能力展示

```css
.capGrid {
  grid-template-columns: repeat(4, 1fr);  /* 桌面：4列 */
}

/* <= 900px: 2列 */
@media (width <= 900px) {
  .capGrid { grid-template-columns: 1fr 1fr; }
  .capGrid article { border-bottom: 1px solid var(--line); }
  .capGrid article:nth-child(2) { border-right: 0; }
}

/* <= 560px: 单列 */
@media (width <= 560px) {
  .capGrid { grid-template-columns: 1fr; }
  .capGrid article { border-right: 0; min-height: 330px; }
}
```

---

## 九、特殊视觉效果

### 9.1 鼠标光晕（Cursor Aura）

```css
.cursorAura {
  z-index: 80;
  left: var(--mouse-x);    /* JS 实时更新 */
  top: var(--mouse-y);
  pointer-events: none;
  mix-blend-mode: screen;
  background: radial-gradient(circle, 
    rgba(109,109,255,0.067), 
    rgba(231,84,164,0.024) 36%, 
    transparent 70%);
  border-radius: 50%;
  width: 380px;
  height: 380px;
  position: fixed;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
}
```

### 9.2 毛玻璃底部渐变（Gradual Blur）

通过多层 `mask-image: linear-gradient` + `backdrop-filter: blur()` 叠加，模拟渐进模糊效果（类似 iOS 底部 Dock 模糊）。

```css
/* 共8层，每层递增 blur 值：0.247rem → 3.600rem */
/* mask 分段：0%-11.1%-22.2%-33.3% 循环偏移 */
backdrop-filter: blur(0.247rem);   /* 第1层 */
backdrop-filter: blur(0.319rem);   /* 第2层 */
backdrop-filter: blur(0.462rem);   /* 第3层 */
/* ... 到第8层 3.600rem */
```

### 9.3 噪声纹理（Noise Overlay）

```css
.noise {
  opacity: 0.1;
  background-image: url("data:image/svg+xml,...");  /* SVG feTurbulence */
  position: absolute;
  inset: 0;
}
```

### 9.4 开场幕布动画（Opening Curtain）

```css
.openingCurtain {
  z-index: 10000;
  animation: 10ms linear 6s forwards opening-failsafe;  /* 6秒后自动隐藏 */
}
.openingCurtain__panel {
  height: 50.2%;
  background: rgb(5,6,6);
}
.openingCurtain__panel--top { top: 0; }
.openingCurtain__panel--bottom { bottom: 0; }
```

---

## 十、Accessibility（无障碍适配）

### 10.1 减少动画模式

```css
@media (preferred-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .cursorAura { display: none; }
  .openingCurtain { display: none !important; }
  .editorialTitle > span {
    clip-path: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .projectVisual, .portrait, .capGrid article {
    transition-duration: 0.01ms !important;
  }
}
```

---

## 十一、组件命名规范（BEM-like）

```
Block:          .hero, .about, .work, .capabilities, .contact
Element:        .heroCopy, .heroStage, .aboutGrid, .aboutCopy
Modifier:       .openingCurtain__panel--top (BEM)
                .bio.muted (多类选择)
Utility:        .shell, .section, .editorialTitle, .editorialLine
State:          .motion-enabled, .motion-reduced
```

---

## 十二、关键适配策略总结

| 策略 | 实现方式 |
|------|---------|
| **流体宽度** | `min(1240px, 100% - 96px)` + `clamp()` 字号 |
| **响应式网格** | `grid-template-columns: repeat(N, 1fr)` 断点切换 |
| **间距压缩** | padding / gap / margin 随断点递减 |
| **字号缩放** | `clamp(min, vw, max)` → 断点切换到 `vw` 固定值 |
| **元素显隐** | `display: none` 隐藏次要导航/装饰 |
| **交错布局重置** | `margin-top: 0` 取消移动端错位 |
| **图片裁切** | `aspect-ratio` + `overflow: hidden` 自适应容器 |
| **动画降级** | `prefers-reduced-motion` 禁用非必要动画 |

---

## 十三、Section 编号系统

每个 Section 顶部有统一的 `sectionTop` 组件：

```
01 / HERO          — HOME
02 / ABOUT         — ABOUT  
03 / CAPABILITIES  — HOW I CREATE VALUE
04 / WORK          — SELECTED WORK
05 / CONTACT       — GET IN TOUCH
```

---

*文档基于 2026 年源码分析生成。的设计与交互持续迭代。*
