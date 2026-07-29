'use client'

import { useEffect } from 'react'

export function useCursorAura() {
  useEffect(() => {
    let rafId = null
    let pendingX = 0
    let pendingY = 0

    const handleMove = (e) => {
      pendingX = e.clientX
      pendingY = e.clientY
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          document.documentElement.style.setProperty('--mouse-x', `${pendingX}px`)
          document.documentElement.style.setProperty('--mouse-y', `${pendingY}px`)
          rafId = null
        })
      }
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handleMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])
}
