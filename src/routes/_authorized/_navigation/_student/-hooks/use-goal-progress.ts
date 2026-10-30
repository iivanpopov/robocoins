import { useLayoutEffect, useRef, useState } from 'react'

import type { RewardProgressResponse } from '#/api/types'
import { prefersReducedMotion } from '#/utils/motion'

import {
  getGoalProgressOrigin,
  getGoalProgressSnapshot,
  getSavedGoalProgressSnapshot,
  saveGoalProgressSnapshot,
} from '../-utils'

const ANIMATION_DURATION_IN_MS = 3000

interface UseGoalProgressValue {
  displayWidth: string
  currentProgress: number
  isAnimating: boolean
}

export function useGoalProgress(
  studentId: number,
  data: RewardProgressResponse | undefined,
  savedSnapshot: string | null,
): UseGoalProgressValue {
  const snapshot = getGoalProgressSnapshot(data)
  const key = `${studentId}:${JSON.stringify(snapshot)}`
  const currentProgress = snapshot?.progress ?? 0
  const saved = getSavedGoalProgressSnapshot(savedSnapshot)
  const origin = getGoalProgressOrigin(saved, snapshot)

  const [display, setDisplay] = useState<{ key: string; progress: number }>(() => ({
    key,
    progress: origin ?? currentProgress,
  }))

  const [isAnimating, setIsAnimating] = useState(false)
  const animationKeyReference = useRef<string | null>(null)

  useLayoutEffect(() => {
    saveGoalProgressSnapshot(studentId, snapshot)

    if (origin === null || origin >= currentProgress || prefersReducedMotion()) {
      setIsAnimating(false)
      return
    }

    const from = origin
    const target = currentProgress
    let startedAt: number | null = null
    let frame: number | null = null

    animationKeyReference.current = key

    function handleFrame(now: number) {
      startedAt ??= now
      const linear = Math.min(1, (now - startedAt) / ANIMATION_DURATION_IN_MS)
      const eased = 1 - (1 - linear) ** 3

      setIsAnimating(true)
      setDisplay({ key, progress: from + (target - from) * eased })
      frame = null

      if (linear < 1) {
        frame = requestAnimationFrame(handleFrame)
        return
      }

      setIsAnimating(false)
    }

    frame = requestAnimationFrame(handleFrame)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
      if (animationKeyReference.current === key) animationKeyReference.current = null
    }
  }, [studentId, key, origin, currentProgress])

  const displayProgress = display.key === key ? display.progress : currentProgress

  return { displayWidth: `${displayProgress}%`, currentProgress, isAnimating }
}
