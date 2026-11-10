import { useEffect, useState } from 'react'

export function useKeyboardInset() {
  const [keyboardInset, setKeyboardInset] = useState(0)

  useEffect(() => {
    if (!window.visualViewport) return
    const viewport = window.visualViewport

    function handleViewportChange() {
      const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
      setKeyboardInset(Math.round(inset))
    }

    viewport.addEventListener('resize', handleViewportChange)
    viewport.addEventListener('scroll', handleViewportChange)
    window.addEventListener('resize', handleViewportChange)

    return () => {
      viewport.removeEventListener('resize', handleViewportChange)
      viewport.removeEventListener('scroll', handleViewportChange)
      window.removeEventListener('resize', handleViewportChange)
    }
  }, [])

  return keyboardInset
}
