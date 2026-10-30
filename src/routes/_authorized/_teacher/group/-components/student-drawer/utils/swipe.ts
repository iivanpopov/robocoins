import type { SwipeEvent, UseSwipeValue } from '#/hooks'

const SWIPE_AXIS_THRESHOLD_IN_PIXELS = 10

export const SWIPE_AXIS_DOMINANCE_RATIO = 1.5

export type SwipeAxis = 'horizontal' | 'vertical' | null

export function resolveSwipeAxis(value: UseSwipeValue, axis: SwipeAxis): SwipeAxis {
  if (axis) return axis

  const horizontalDistance = Math.abs(value.lengthX)
  const verticalDistance = Math.abs(value.lengthY)

  if (Math.max(horizontalDistance, verticalDistance) < SWIPE_AXIS_THRESHOLD_IN_PIXELS) return null
  if (horizontalDistance > verticalDistance * SWIPE_AXIS_DOMINANCE_RATIO) return 'horizontal'
  if (verticalDistance > horizontalDistance) return 'vertical'
  return null
}

export function isCancelledSwipe(event: SwipeEvent) {
  return event.type === 'pointercancel' || event.type === 'touchcancel'
}

export function isPrimaryPointer(event: SwipeEvent) {
  if (!('button' in event)) return true
  return event.button === 0
}
