import * as v from 'valibot'

import { StreakDaysSchema } from '../-schemas'

export function parseStreakDays(value: string) {
  const result = v.safeParse(StreakDaysSchema, value)
  return result.success ? result.output : null
}
