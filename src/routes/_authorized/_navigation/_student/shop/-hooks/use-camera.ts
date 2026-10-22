import { useEffect, useRef } from 'react'

import { getCameraProgress } from '../-utils'

type Camera = { x: number; y: number; zoom: number }

export function useCamera(cameraRef: React.RefObject<Camera>, onChange: () => void) {
  const frameRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    },
    [],
  )

  function handleAnimate(target: Camera, duration: number, onComplete?: () => void) {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    const origin = { ...cameraRef.current }
    const startedAt = performance.now()
    function handleFrame(now: number) {
      const progress = Math.min(1, (now - startedAt) / duration)
      const eased = getCameraProgress(progress)
      cameraRef.current = {
        x: origin.x + (target.x - origin.x) * eased,
        y: origin.y + (target.y - origin.y) * eased,
        zoom: origin.zoom + (target.zoom - origin.zoom) * eased,
      }
      onChange()
      frameRef.current = null
      if (progress < 1) frameRef.current = requestAnimationFrame(handleFrame)
      else onComplete?.()
    }
    frameRef.current = requestAnimationFrame(handleFrame)
  }

  return { handleAnimate }
}
