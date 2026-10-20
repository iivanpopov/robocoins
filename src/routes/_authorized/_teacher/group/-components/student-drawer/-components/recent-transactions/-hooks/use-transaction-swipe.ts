import { RefObject, useRef, useState } from 'react'

import { SwipeEvent, UseSwipeValue, useSwipe } from '#/hooks'

import {
  isCancelledSwipe,
  isPrimaryPointer,
  resolveSwipeAxis,
  SWIPE_AXIS_DOMINANCE_RATIO,
} from '../../../-utils'

const FULL_SWIPE_WIDTH_RATIO = 0.75

interface UseTransactionSwipeProps {
  enabled: boolean
  onCancel: () => void
}

export function useTransactionSwipe(
  props: UseTransactionSwipeProps,
  elementReference: RefObject<HTMLDivElement | null>,
) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const gestureReference = useRef<{
    width: number
    axis: 'horizontal' | 'vertical' | null
  } | null>(null)
  useSwipe(elementReference, {
    onStart: handleSwipeStart,
    onMove: handleSwipeMove,
    onEnd: handleSwipeEnd,
  })

  function handleSwipeStart(_value: UseSwipeValue, event: SwipeEvent) {
    gestureReference.current = null
    if (!props.enabled) return
    if (!isPrimaryPointer(event)) return

    const width = elementReference.current?.getBoundingClientRect().width ?? 0
    if (!width) return

    gestureReference.current = { width, axis: null }
    setOffset(0)
    setIsReady(false)
    setIsDragging(true)
  }

  function handleSwipeMove(value: UseSwipeValue) {
    const gesture = gestureReference.current
    if (!gesture || !props.enabled) return

    gesture.axis = resolveSwipeAxis(value, gesture.axis)

    if (gesture.axis !== 'horizontal') return

    const nextOffset = Math.max(0, Math.min(value.lengthX, gesture.width))
    setOffset(nextOffset)
    setIsReady(nextOffset >= gesture.width * FULL_SWIPE_WIDTH_RATIO)
  }

  function handleSwipeEnd(value: UseSwipeValue, event: SwipeEvent) {
    handleSwipeMove(value)
    const gesture = gestureReference.current
    gestureReference.current = null
    setOffset(0)
    setIsDragging(false)
    setIsReady(false)

    if (isCancelledSwipe(event)) return
    if (!props.enabled || !gesture || gesture.axis !== 'horizontal') return
    if (value.lengthX <= Math.abs(value.lengthY) * SWIPE_AXIS_DOMINANCE_RATIO) return
    if (value.lengthX < gesture.width * FULL_SWIPE_WIDTH_RATIO) return

    props.onCancel()
  }

  return { offset, isDragging, isReady }
}
