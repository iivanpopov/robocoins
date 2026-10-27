import { RefObject, useEffect, useRef, useState } from 'react'

import { BalanceTransactionResponse } from '#/api/types'
import { SwipeEvent, UseSwipeValue, useSwipe } from '#/hooks'

import {
  isCancelledSwipe,
  isPrimaryPointer,
  resolveSwipeAxis,
  SWIPE_AXIS_DOMINANCE_RATIO,
} from '../../../-utils'

const FULL_SWIPE_WIDTH_RATIO = 0.75
const CONFIRM_DELAY_IN_MS = 1500
const CANCEL_WINDOW_IN_MS = 24 * 60 * 60 * 1000

interface UseTransactionSwipeProps {
  enabled: boolean
  onCancel: () => void
}

export function isTransactionCancellable(
  transaction: BalanceTransactionResponse,
  enabled: boolean,
) {
  return (
    enabled &&
    !transaction.cancelled_at &&
    Date.now() - new Date(transaction.created_at).getTime() <= CANCEL_WINDOW_IN_MS
  )
}

export function useTransactionSwipe(
  props: UseTransactionSwipeProps,
  elementReference: RefObject<HTMLDivElement | null>,
) {
  const [offset, setOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [isArmed, setIsArmed] = useState(false)
  const gestureReference = useRef<{
    width: number
    axis: 'horizontal' | 'vertical' | null
  } | null>(null)
  const armTimeoutReference = useRef<number | null>(null)
  const resetTimeoutReference = useRef<number | null>(null)
  useSwipe(elementReference, {
    onStart: handleSwipeStart,
    onMove: handleSwipeMove,
    onEnd: handleSwipeEnd,
  })

  useEffect(() => () => clearConfirmationTimeouts(), [])

  function clearConfirmationTimeouts() {
    if (armTimeoutReference.current !== null) {
      clearTimeout(armTimeoutReference.current)
      armTimeoutReference.current = null
    }
    if (resetTimeoutReference.current !== null) {
      clearTimeout(resetTimeoutReference.current)
      resetTimeoutReference.current = null
    }
  }

  function handleSwipeStart(_value: UseSwipeValue, event: SwipeEvent) {
    if (event.target instanceof Element && event.target.closest('[data-confirm-action]')) return

    gestureReference.current = null
    if (!props.enabled) return
    if (!isPrimaryPointer(event)) return

    const width = elementReference.current?.getBoundingClientRect().width ?? 0
    if (!width) return

    clearConfirmationTimeouts()
    setIsConfirming(false)
    setIsArmed(false)

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

    setIsConfirming(true)
    armTimeoutReference.current = window.setTimeout(() => {
      armTimeoutReference.current = null
      setIsArmed(true)
      resetTimeoutReference.current = window.setTimeout(() => {
        resetTimeoutReference.current = null
        setIsConfirming(false)
        setIsArmed(false)
      }, CONFIRM_DELAY_IN_MS)
    }, CONFIRM_DELAY_IN_MS)
  }

  return { offset, isDragging, isReady, isConfirming, isArmed }
}
