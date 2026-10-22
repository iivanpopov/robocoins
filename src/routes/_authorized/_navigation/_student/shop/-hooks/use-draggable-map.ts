import { useEffect, useRef } from 'react'

import { prefersReducedMotion } from '#/utils/motion'

import { advanceMapInertia, interpolateMapOffset } from '../-utils'

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
    smooth: false,
  })
  const targetOffsetRef = useRef({ ...offsetRef.current })
  const velocityRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | null>(null)
  const frameTimeRef = useRef(0)

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
    targetOffsetRef.current = { ...offsetRef.current }
  }

  function handleFrame(now: number) {
    frameRef.current = null
    if (prefersReducedMotion()) {
      offsetRef.current = { ...targetOffsetRef.current }
      handleStop()
      onChange()
      return
    }
    const elapsed = Math.min(50, Math.max(0, now - frameTimeRef.current))
    frameTimeRef.current = now
    if (pointerRef.current.id === null) {
      const motion = advanceMapInertia(targetOffsetRef.current, velocityRef.current, elapsed)
      targetOffsetRef.current = motion.offset
      velocityRef.current = motion.velocity
    }
    if (pointerRef.current.smooth)
      offsetRef.current = interpolateMapOffset(offsetRef.current, targetOffsetRef.current, elapsed)
    else offsetRef.current = { ...targetOffsetRef.current }
    onChange()
    const remaining = Math.hypot(
      targetOffsetRef.current.x - offsetRef.current.x,
      targetOffsetRef.current.y - offsetRef.current.y,
    )
    const isCoasting =
      pointerRef.current.id === null &&
      Math.hypot(velocityRef.current.x, velocityRef.current.y) >= 0.009
    if (remaining >= 0.1 || isCoasting) frameRef.current = requestAnimationFrame(handleFrame)
  }

  function handleScheduleFrame() {
    if (frameRef.current !== null) return
    frameTimeRef.current = performance.now()
    frameRef.current = requestAnimationFrame(handleFrame)
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
      smooth: event.pointerType === 'touch',
    }
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const pointer = pointerRef.current
    if (pointer.id !== event.pointerId) return
    const deltaX = event.clientX - pointer.x
    const deltaY = event.clientY - pointer.y
    const elapsed = Math.max(1, event.timeStamp - pointer.time)
    if (!pointer.moved) {
      if (Math.hypot(event.clientX - pointer.startX, event.clientY - pointer.startY) <= 3) return
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
    targetOffsetRef.current = {
      x: targetOffsetRef.current.x + deltaX,
      y: targetOffsetRef.current.y + deltaY,
    }
    if (pointer.smooth && !prefersReducedMotion()) handleScheduleFrame()
    else {
      offsetRef.current = { ...targetOffsetRef.current }
      onChange()
    }
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
    if (!pointer.moved || prefersReducedMotion()) {
      handleStop()
      return
    }
    const releaseDecay = Math.exp(-Math.max(0, event.timeStamp - pointer.time) / 50)
    velocityRef.current.x *= releaseDecay
    velocityRef.current.y *= releaseDecay
    if (Math.hypot(velocityRef.current.x, velocityRef.current.y) < 0.05)
      velocityRef.current = { x: 0, y: 0 }
    frameTimeRef.current = performance.now()
    handleScheduleFrame()
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
