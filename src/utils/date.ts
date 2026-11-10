const DAY_DURATION = 86_400_000
const KYIV_TIME_ZONE = 'Europe/Kyiv'

type ZonedParts = {
  year: string
  month: string
  day: string
  hour: string
  minute: string
  second: string
}

const partsFormatters = new Map<string, Intl.DateTimeFormat>()

function getPartsFormatter(timeZone: string) {
  const existing = partsFormatters.get(timeZone)
  if (existing) return existing

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
  partsFormatters.set(timeZone, formatter)

  return formatter
}

function formatZonedParts(epoch: number, timeZone: string): ZonedParts {
  const parts = getPartsFormatter(timeZone).formatToParts(new Date(epoch))
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? ''

  return {
    year: get('year'),
    month: get('month'),
    day: get('day'),
    hour: get('hour'),
    minute: get('minute'),
    second: get('second'),
  }
}

function toEpoch(value: string | number) {
  return typeof value === 'number' ? value : Date.parse(value)
}

export function getKyivDate(value: string | number) {
  const { year, month, day } = formatZonedParts(toEpoch(value), KYIV_TIME_ZONE)

  return `${year}-${month}-${day}`
}

export function getKyivWeekday(value: string | number) {
  return new Date(Date.parse(getKyivDate(value))).getUTCDay()
}

export function kyivWallClockToEpoch(date: string, hour: number, minute: number) {
  const [year, month, day] = date.split('-').map(Number)
  const wallClock = Date.UTC(year, month - 1, day, hour, minute)

  const offsetAt = (epoch: number) => {
    const parts = formatZonedParts(epoch, KYIV_TIME_ZONE)
    const asUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour),
      Number(parts.minute),
      Number(parts.second),
    )

    return asUtc - epoch
  }

  let epoch = wallClock - offsetAt(wallClock)
  epoch = wallClock - offsetAt(epoch)

  return epoch
}

export function getISOWeek(date: string) {
  const target = new Date(`${date}T00:00:00Z`)
  const targetDay = (target.getUTCDay() + 6) % 7
  target.setUTCDate(target.getUTCDate() - targetDay + 3)

  const jan4 = new Date(Date.UTC(target.getUTCFullYear(), 0, 4))
  const jan4Day = (jan4.getUTCDay() + 6) % 7
  jan4.setUTCDate(jan4.getUTCDate() - jan4Day + 3)

  return 1 + Math.round((target.getTime() - jan4.getTime()) / (7 * DAY_DURATION))
}
