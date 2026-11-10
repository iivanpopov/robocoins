import { Weekday } from '#/routes/-constants'
import type { parseGroupSchedule } from '#/routes/-utils'
import { getKyivDate, getKyivWeekday, kyivWallClockToEpoch } from '#/utils/date'

const WEEKDAYS = [
  Weekday.Sunday,
  Weekday.Monday,
  Weekday.Tuesday,
  Weekday.Wednesday,
  Weekday.Thursday,
  Weekday.Friday,
  Weekday.Saturday,
]

export function getGroupLessonWindow(
  schedule: ReturnType<typeof parseGroupSchedule>,
  now: Date | null,
) {
  if (
    !now ||
    !Number.isFinite(now.getTime()) ||
    !schedule.weekday ||
    schedule.startMinutes === undefined ||
    schedule.durationMinutes === undefined
  )
    return null

  const daysSinceStart =
    (getKyivWeekday(now.getTime()) - WEEKDAYS.indexOf(schedule.weekday) + 7) % 7
  const startDate = getKyivDate(now.getTime() - daysSinceStart * 86_400_000)
  const start = kyivWallClockToEpoch(
    startDate,
    Math.floor(schedule.startMinutes / 60),
    schedule.startMinutes % 60,
  )
  const end = start + schedule.durationMinutes * 60_000

  if (now.getTime() < start || now.getTime() >= end) return null

  return { start, end }
}
