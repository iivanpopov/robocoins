const WEEKDAYS = {
  ПН: 'weekday.monday',
  ВТ: 'weekday.tuesday',
  СР: 'weekday.wednesday',
  ЧТ: 'weekday.thursday',
  ПТ: 'weekday.friday',
  СБ: 'weekday.saturday',
  НД: 'weekday.sunday',
} as const

export function parseGroupSchedule(value: string) {
  const match = /^(ПН|ВТ|СР|ЧТ|ПТ|СБ|НД)[.,]?\s+([01]?\d|2[0-3]):([0-5]\d)$/iu.exec(value.trim())
  if (!match) return { weekday: undefined, time: value }
  const weekday = WEEKDAYS[match[1].toUpperCase() as keyof typeof WEEKDAYS]
  const hours = match[2].padStart(2, '0')
  const endMinutes = (Number(match[2]) * 60 + Number(match[3]) + 110) % (24 * 60)
  const endHours = String(Math.floor(endMinutes / 60)).padStart(2, '0')
  const endMinute = String(endMinutes % 60).padStart(2, '0')
  return { weekday, time: `${hours}:${match[3]} – ${endHours}:${endMinute}` }
}
