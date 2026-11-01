import type { StreakResponse } from '#/api/types'

export function getStreakDays(streak?: StreakResponse) {
  if (!streak) return 0

  return Math.max(0, streak.days)
}
