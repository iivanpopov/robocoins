import { useRef } from 'react'

import { SwipeEvent, UseSwipeValue, useSwipe } from '#/hooks'
import { AwardDirection } from '#/routes/_authorized/_teacher/group/-constants'

import {
  isCancelledSwipe,
  isPrimaryPointer,
  resolveSwipeAxis,
  SWIPE_AXIS_DOMINANCE_RATIO,
} from '../../../-utils'

const SWIPE_THRESHOLD_IN_PIXELS = 50

interface UseDirectionSwipeProps {
  direction: AwardDirection
  enabled: boolean
  onDirectionChange: (direction: AwardDirection) => void
}

export function useDirectionSwipe(props: UseDirectionSwipeProps) {
  const swipeReference = useRef<{
    direction: AwardDirection
    axis: 'horizontal' | 'vertical' | null
  } | null>(null)
  const swipe = useSwipe<HTMLDivElement>({
    threshold: SWIPE_THRESHOLD_IN_PIXELS,
    onStart: handleSwipeStart,
    onMove: handleSwipeMove,
    onEnd: handleSwipeEnd,
  })

  function handleSwipeStart(_value: UseSwipeValue, event: SwipeEvent) {
    swipeReference.current = null

    if (!props.enabled) return
    if (!isPrimaryPointer(event)) return

    swipeReference.current = { direction: props.direction, axis: null }
  }

  function handleSwipeMove(value: UseSwipeValue) {
    const swipe = swipeReference.current
    if (!swipe) return

    swipe.axis = resolveSwipeAxis(value, swipe.axis)
  }

  function handleSwipeEnd(value: UseSwipeValue, event: SwipeEvent) {
    handleSwipeMove(value)
    const swipe = swipeReference.current
    swipeReference.current = null

    if (isCancelledSwipe(event)) return
    if (
      !swipe ||
      swipe.axis !== 'horizontal' ||
      !props.enabled ||
      props.direction !== swipe.direction ||
      Math.abs(value.lengthX) <= Math.abs(value.lengthY) * SWIPE_AXIS_DOMINANCE_RATIO
    )
      return

    if (value.direction !== 'left' && value.direction !== 'right') return

    if (props.direction === AwardDirection.Reward) props.onDirectionChange(AwardDirection.Punish)
    if (props.direction === AwardDirection.Punish) props.onDirectionChange(AwardDirection.Reward)
  }

  return swipe.ref
}
