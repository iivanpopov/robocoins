import * as v from 'valibot'

import type { RewardProgressResponse } from '#/api/types'
import { STORAGE_YEAR_TTL_IN_MS } from '#/routes/-constants'
import { readExpiringStorage, writeExpiringStorage } from '#/utils/storage'

const GoalProgressSnapshotSchema = v.object({
  goalId: v.number(),
  price: v.pipe(v.number(), v.minValue(0)),
  balance: v.number(),
  progress: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
})

export type GoalProgressSnapshot = v.InferOutput<typeof GoalProgressSnapshotSchema>

export function getGoalProgressStorageKey(studentId: number) {
  return `robocoins-goal-progress-${studentId}`
}

export function getGoalProgressSnapshot(data: RewardProgressResponse | undefined) {
  if (!data?.current_goal) return null

  const snapshot = {
    goalId: data.current_goal.id,
    price: data.current_goal.price,
    balance: data.balance,
    progress: Math.max(0, Math.min(100, data.progress_percent ?? 0)),
  }

  if (!Object.values(snapshot).every(Number.isFinite)) return null
  return snapshot
}

export function getSavedGoalProgressSnapshot(studentId: number) {
  const saved = readExpiringStorage(getGoalProgressStorageKey(studentId))
  if (!saved) return null

  const parsed = v.safeParse(GoalProgressSnapshotSchema, saved)
  return parsed.success ? parsed.output : null
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
  const key = getGoalProgressStorageKey(studentId)

  if (!snapshot) {
    localStorage.removeItem(key)
    return
  }

  writeExpiringStorage(key, snapshot, STORAGE_YEAR_TTL_IN_MS)
}
