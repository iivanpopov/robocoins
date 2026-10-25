import * as v from 'valibot'

import type { RewardProgressResponse } from '#/api/types'

const GoalProgressSnapshotSchema = v.object({
  goalId: v.number(),
  price: v.pipe(v.number(), v.minValue(0)),
  balance: v.number(),
  progress: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
})

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

export function consumeGoalProgressSnapshot(
  studentId: number,
  snapshot: ReturnType<typeof getGoalProgressSnapshot>,
) {
  const currentProgress = snapshot?.progress ?? 0

  try {
    const key = `robocoins:goal-progress:${studentId}`
    const saved = localStorage.getItem(key)

    if (!snapshot) {
      localStorage.removeItem(key)
      return currentProgress
    }

    localStorage.setItem(key, JSON.stringify(snapshot))
    if (!saved) return currentProgress

    const previous = v.safeParse(GoalProgressSnapshotSchema, JSON.parse(saved))

    if (
      previous.success &&
      previous.output.goalId === snapshot.goalId &&
      previous.output.price === snapshot.price &&
      previous.output.balance < snapshot.balance &&
      previous.output.progress < snapshot.progress
    ) {
      return previous.output.progress
    }
  } catch {
    return currentProgress
  }

  return currentProgress
}
