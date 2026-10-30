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
const MINUTES_PER_DAY = 24 * 60
const MINUTES_PER_WEEK = 7 * MINUTES_PER_DAY

export function isGroupScheduleActive(
  schedule: ReturnType<typeof parseGroupSchedule>,
  now: Date | null,
) {
  if (
    !now ||
    !schedule.weekday ||
    schedule.startMinutes === undefined ||
    schedule.durationMinutes === undefined
  )
    return false

  const startMinutes = WEEKDAYS.indexOf(schedule.weekday) * MINUTES_PER_DAY + schedule.startMinutes
  const currentMinutes = now.getDay() * MINUTES_PER_DAY + now.getHours() * 60 + now.getMinutes()
  const elapsedMinutes = (currentMinutes - startMinutes + MINUTES_PER_WEEK) % MINUTES_PER_WEEK

  return elapsedMinutes < schedule.durationMinutes
}
