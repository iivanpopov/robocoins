import { Temporal } from '@js-temporal/polyfill'

import { Weekday } from '../-constants'
import type { parseGroupSchedule } from './parse-group-schedule'

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

  const current = Temporal.Instant.fromEpochMilliseconds(now.getTime()).toZonedDateTimeISO(
    'Europe/Kyiv',
  )
  const daysSinceStart = ((current.dayOfWeek % 7) - WEEKDAYS.indexOf(schedule.weekday) + 7) % 7
  const startDate = current.toPlainDate().subtract({ days: daysSinceStart })
  const start = startDate.toZonedDateTime({
    timeZone: 'Europe/Kyiv',
    plainTime: { hour: Math.floor(schedule.startMinutes / 60), minute: schedule.startMinutes % 60 },
  }).epochMilliseconds
  const end = start + schedule.durationMinutes * 60_000

  if (now.getTime() < start || now.getTime() >= end) return null

  return { start, end }
}
