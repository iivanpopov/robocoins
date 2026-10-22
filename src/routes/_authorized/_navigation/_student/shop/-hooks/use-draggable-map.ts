import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '#/utils/motion'

import { advanceMapInertia } from '../-utils'

export function useDraggableMap(
  offsetRef: React.RefObject<{ x: number; y: number }>,
  onChange: () => void,
  isBlocked: () => boolean,
) {
  const pointerRef = useRef({
    id: null as number | null,
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
    time: 0,
    moved: false,
  })
  const velocityRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    },
    [],
  )

  function handleStop() {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = null
    velocityRef.current = { x: 0, y: 0 }
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (isBlocked() || pointerRef.current.id !== null || !event.isPrimary || event.button !== 0)
      return
    handleStop()
    pointerRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
      time: event.timeStamp,
      moved: false,
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current
    if (pointer.id !== event.pointerId) return
    const deltaX = event.clientX - pointer.x
    const deltaY = event.clientY - pointer.y
    const elapsed = Math.max(1, event.timeStamp - pointer.time)
    if (
      !pointer.moved &&
      Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) > 3
    ) {
      pointer.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    const weight = 1 - Math.exp(-elapsed / 25)
    velocityRef.current = {
      x: velocityRef.current.x * (1 - weight) + (deltaX / elapsed) * weight,
      y: velocityRef.current.y * (1 - weight) + (deltaY / elapsed) * weight,
    }
    pointer.x = event.clientX
    pointer.y = event.clientY
    pointer.time = event.timeStamp
    offsetRef.current = { x: offsetRef.current.x + deltaX, y: offsetRef.current.y + deltaY }
    onChange()
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerRef.current.id !== event.pointerId) return
    pointerRef.current.id = null
    pointerRef.current.moved = true
    handleStop()
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current
    if (pointer.id !== event.pointerId) return
    pointer.id = null
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    if (prefersReducedMotion()) {
      handleStop()
      return
    }
    const releaseDecay = Math.exp(-Math.max(0, event.timeStamp - pointer.time) / 50)
    velocityRef.current.x *= releaseDecay
    velocityRef.current.y *= releaseDecay
    if (!pointer.moved || Math.hypot(velocityRef.current.x, velocityRef.current.y) < 0.05) return
    let lastTime = performance.now()
    function handleInertia(now: number) {
      if (prefersReducedMotion()) {
        handleStop()
        return
      }
      const elapsed = Math.min(50, now - lastTime)
      lastTime = now
      const motion = advanceMapInertia(offsetRef.current, velocityRef.current, elapsed)
      offsetRef.current = motion.offset
      velocityRef.current = motion.velocity
      onChange()
      frameRef.current = null
      if (Math.hypot(velocityRef.current.x, velocityRef.current.y) >= 0.009)
        frameRef.current = requestAnimationFrame(handleInertia)
    }
    frameRef.current = requestAnimationFrame(handleInertia)
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) handlePointerCancel(event)
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    if (isBlocked() || pointerRef.current.id !== null) return
    handleStop()
    let unit = 1
    if (event.deltaMode === 1) unit = 16
    if (event.deltaMode === 2) unit = event.currentTarget.clientHeight
    offsetRef.current = {
      x: offsetRef.current.x - event.deltaX * unit,
      y: offsetRef.current.y - event.deltaY * unit,
    }
    onChange()
  }

  function handleCanSelect() {
    return pointerRef.current.id === null && !pointerRef.current.moved
  }

  return {
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handlePointerCancel,
    handlePointerLeave,
    handleLostPointerCapture: handlePointerLeave,
    handleWheel,
    handleStop,
    handleCanSelect,
  }
}
