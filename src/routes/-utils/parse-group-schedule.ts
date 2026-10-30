import { Weekday } from '../-constants'

const WEEKDAY_LABELS = {
  [Weekday.Monday]: 'ПН',
  [Weekday.Tuesday]: 'ВТ',
  [Weekday.Wednesday]: 'СР',
  [Weekday.Thursday]: 'ЧТ',
  [Weekday.Friday]: 'ПТ',
  [Weekday.Saturday]: 'СБ',
  [Weekday.Sunday]: 'НД',
} as const

const WEEKDAYS_BY_LABEL = Object.fromEntries(
  Object.entries(WEEKDAY_LABELS).map(([weekday, label]) => [label, weekday]),
) as Record<keyof typeof WEEKDAY_LABELS, Weekday>

const WEEKDAY_PATTERN = Object.values(WEEKDAY_LABELS).join('|')
const STRICT_TIME_PATTERN = '([01]\\d|2[0-3]):([0-5]\\d)'
const SCHEDULE_TIME_PATTERN = '([01]?\\d|2[0-3]):([0-5]\\d)'

export const GROUP_NAME_PATTERN = new RegExp(`^(${WEEKDAY_PATTERN}) ${STRICT_TIME_PATTERN}$`)
const SCHEDULE_PATTERN = new RegExp(`^(${WEEKDAY_PATTERN})[.,]?\\s+${SCHEDULE_TIME_PATTERN}$`, 'iu')
const LESSON_DURATION_IN_MINUTES = 110

export function parseGroupSchedule(value: string) {
  const match = SCHEDULE_PATTERN.exec(value.trim())
  if (!match)
    return { weekday: undefined, time: value, startMinutes: undefined, durationMinutes: undefined }
  const weekday = WEEKDAYS_BY_LABEL[match[1].toUpperCase() as keyof typeof WEEKDAYS_BY_LABEL]
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
