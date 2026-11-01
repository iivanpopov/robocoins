import { Temporal } from '@js-temporal/polyfill'

export function getKyivDate(value: string | number) {
  const milliseconds = typeof value === 'number' ? value : Date.parse(value)

  return Temporal.Instant.fromEpochMilliseconds(milliseconds)
    .toZonedDateTimeISO('Europe/Kyiv')
    .toPlainDate()
}
