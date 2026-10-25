import { Weekday } from '../-constants'

const WEEKDAYS = {
  ПН: Weekday.Monday,
  ВТ: Weekday.Tuesday,
  СР: Weekday.Wednesday,
  ЧТ: Weekday.Thursday,
  ПТ: Weekday.Friday,
  СБ: Weekday.Saturday,
  НД: Weekday.Sunday,
} as const

const WEEKDAY_PATTERN = Object.keys(WEEKDAYS).join('|')
const SCHEDULE_PATTERN = new RegExp(
  `^(${WEEKDAY_PATTERN})[.,]?\\s+([01]?\\d|2[0-3]):([0-5]\\d)$`,
  'iu',
)
const LESSON_DURATION_IN_MINUTES = 110

export function parseGroupSchedule(value: string) {
  const match = SCHEDULE_PATTERN.exec(value.trim())
  if (!match)
    return { weekday: undefined, time: value, startMinutes: undefined, durationMinutes: undefined }
  const weekday = WEEKDAYS[match[1].toUpperCase() as keyof typeof WEEKDAYS]
  const hours = match[2].padStart(2, '0')
  const startMinutes = Number(match[2]) * 60 + Number(match[3])
  const endMinutes = (startMinutes + LESSON_DURATION_IN_MINUTES) % (24 * 60)
  const endHours = String(Math.floor(endMinutes / 60)).padStart(2, '0')
  const endMinute = String(endMinutes % 60).padStart(2, '0')
  return {
    weekday,
    time: `${hours}:${match[3]} – ${endHours}:${endMinute}`,
    startMinutes,
    durationMinutes: LESSON_DURATION_IN_MINUTES,
  }
}
