'use client'

import { useEffect, useRef } from 'react'

export default function Galaxy() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let frame
    let stars = []

    const resize = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars = Array.from(
        { length: Math.max(40, Math.floor((width * height) / 8000)) },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() + 0.25,
          p: Math.random() * 6.28,
        }),
      )
    }

    const draw = () => {
      const { width, height } = canvas.parentElement.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      stars.forEach((s) => {
        s.p += 0.018
        ctx.fillStyle = `rgba(233,230,223,${0.18 + Math.sin(s.p) * 0.16})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, 6.28)
        ctx.fill()
        s.y -= 0.09
        if (s.y < 0) s.y = height
      })
      frame = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas className="galaxy" ref={ref} aria-hidden="true" />
}
