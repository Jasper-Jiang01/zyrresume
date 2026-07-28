'use client'

import { useEffect } from 'react'

export function useCursorAura() {
  useEffect(() => {
    const update = (event) => {
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', update)
    return () => window.removeEventListener('pointermove', update)
  }, [])
}
