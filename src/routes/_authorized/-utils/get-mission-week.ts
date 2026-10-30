import type { DailyTaskResponse, StreakResponse } from '#/api/types'

import { getStreakDays } from './get-streak-days'

const DAY_DURATION = 86_400_000

export function getMissionWeek(task?: DailyTaskResponse, streak?: StreakResponse) {
  const taskDate = Date.parse(`${task?.date}T12:00:00Z`)
  const weekday = Number.isFinite(taskDate) ? (new Date(taskDate).getUTCDay() + 6) % 7 : undefined
  const completedDays = Array<boolean>(7).fill(false)
  const streakDays = Math.max(getStreakDays(streak, task?.date), task?.completed_at ? 1 : 0)

  if (weekday === undefined) {
    return { weekday, completedDays, weeklyCompleted: undefined, streakDays }
  }

  const weekStart = taskDate - weekday * DAY_DURATION
  const streakStart = Date.parse(`${streak?.start_date?.slice(0, 10)}T12:00:00Z`)
  const streakEnd = Date.parse(`${streak?.end_date?.slice(0, 10)}T12:00:00Z`)
  const hasWeeklyProgress = Boolean(streak || task?.completed_at)

  if (streakDays > 0 && Number.isFinite(streakStart)) {
    let lastCompletedDate = streakStart + (streakDays - 1) * DAY_DURATION
    if (Number.isFinite(streakEnd)) lastCompletedDate = Math.min(lastCompletedDate, streakEnd)

    for (let i = 0; i < weekday; i++) {
      const date = weekStart + i * DAY_DURATION
      completedDays[i] = date >= streakStart && date <= lastCompletedDate
    }
  }

  completedDays[weekday] = Boolean(task?.completed_at)

  const weeklyCompleted = hasWeeklyProgress ? completedDays.filter(Boolean).length : undefined

  return { weekday, completedDays, weeklyCompleted, streakDays }
}
