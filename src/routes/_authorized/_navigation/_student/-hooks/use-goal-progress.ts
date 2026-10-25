import { useLayoutEffect, useRef, useState } from 'react'

import type { RewardProgressResponse } from '#/api/types'
import { prefersReducedMotion } from '#/utils/motion'

import { consumeGoalProgressSnapshot, getGoalProgressSnapshot } from '../-utils'

export function useGoalProgress(studentId: number, data: RewardProgressResponse | undefined) {
  const [display, setDisplay] = useState<{ key: string; progress: number } | null>(null)
  const animationRef = useRef<{ key: string; origin: number } | null>(null)

  useLayoutEffect(() => {
    if (!data) return

    const snapshot = getGoalProgressSnapshot(data)
    const key = JSON.stringify([studentId, snapshot])
    const currentProgress = snapshot?.progress ?? 0

    if (animationRef.current?.key !== key) {
      animationRef.current = {
        key,
        origin: consumeGoalProgressSnapshot(studentId, snapshot),
      }
    }

    const origin = animationRef.current.origin

    if (origin >= currentProgress || prefersReducedMotion()) {
      setDisplay({ key, progress: currentProgress })
      return
    }

    const duration = 900
    let startedAt: number | null = null
    let frame: number | null = null

    setDisplay({ key, progress: origin })

    function handleFrame(now: number) {
      startedAt ??= now
      let progress = Math.min(1, (now - startedAt) / duration)
      if (prefersReducedMotion()) progress = 1

      const eased = 1 - (1 - progress) ** 3
      setDisplay({ key, progress: origin + (currentProgress - origin) * eased })
      frame = null

      if (progress < 1) frame = requestAnimationFrame(handleFrame)
    }

    frame = requestAnimationFrame(handleFrame)

    return () => {
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [
    studentId,
    Boolean(data),
    data?.balance,
    data?.reward?.id,
    data?.reward?.price,
    data?.progress_percent,
  ])

  const snapshot = getGoalProgressSnapshot(data)
  const key = JSON.stringify([studentId, snapshot])
  const progress = snapshot?.progress ?? 0
  let displayProgress = progress
  if (display?.key === key) displayProgress = display.progress

  return { displayWidth: `${displayProgress}%`, currentProgress: progress }
}
