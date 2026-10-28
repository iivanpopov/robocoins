import type { StreakResponse } from '#/api/types'

const DAY_DURATION = 86_400_000

function parseDay(value?: string | null) {
  if (!value) return undefined

  const time = Date.parse(`${value.slice(0, 10)}T12:00:00Z`)
  return Number.isFinite(time) ? time : undefined
}

export function getStreakDays(streak?: StreakResponse, date?: string) {
  if (!streak) return 0

  const start = parseDay(streak.start_date)
  const end = parseDay(streak.end_date) ?? parseDay(date) ?? parseDay(new Date().toISOString()) ?? 0
  if (start === undefined) return 0

  return Math.max(0, Math.round((end - start) / DAY_DURATION) + 1)
}
