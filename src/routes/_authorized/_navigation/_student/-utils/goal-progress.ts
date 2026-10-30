import * as v from 'valibot'

import type { RewardProgressResponse } from '#/api/types'
import { COOKIE_MAX_AGE } from '#/routes/-constants'

const GoalProgressSnapshotSchema = v.object({
  goalId: v.number(),
  price: v.pipe(v.number(), v.minValue(0)),
  balance: v.number(),
  progress: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
})

type GoalProgressSnapshot = v.InferOutput<typeof GoalProgressSnapshotSchema>

export function getGoalProgressCookieName(studentId: number) {
  return `robocoins-goal-progress-${studentId}`
}

export function getGoalProgressSnapshot(data: RewardProgressResponse | undefined) {
  if (!data?.reward) return null

  const snapshot = {
    goalId: data.reward.id,
    price: data.reward.price,
    balance: data.balance,
    progress: Math.max(0, Math.min(100, data.progress_percent ?? 0)),
  }

  if (!Object.values(snapshot).every(Number.isFinite)) return null
  return snapshot
}

export function getSavedGoalProgressSnapshot(saved: string | null) {
  if (!saved) return null

  try {
    const parsed = v.safeParse(GoalProgressSnapshotSchema, JSON.parse(saved))
    return parsed.success ? parsed.output : null
  } catch {
    return null
  }
}

export function getGoalProgressOrigin(
  previous: GoalProgressSnapshot | null,
  snapshot: GoalProgressSnapshot | null,
) {
  if (!previous || !snapshot) return null
  if (previous.goalId !== snapshot.goalId || previous.price !== snapshot.price) return null
  if (previous.balance >= snapshot.balance || previous.progress >= snapshot.progress) return null
  return previous.progress
}

export function saveGoalProgressSnapshot(studentId: number, snapshot: GoalProgressSnapshot | null) {
  if (typeof document === 'undefined') return

  const name = getGoalProgressCookieName(studentId)

  try {
    if (!snapshot) {
      document.cookie = `${name}=; path=/; max-age=0; samesite=lax`
      return
    }

    document.cookie = `${name}=${encodeURIComponent(JSON.stringify(snapshot))}; path=/; max-age=${
      COOKIE_MAX_AGE / 1000
    }; samesite=lax`
  } catch {
    return
  }
}
