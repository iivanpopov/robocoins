import { notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { AchievementIdParamsSchema } from '../-schemas'

export function parseAchievementIdParams(params: Record<string, string>) {
  const result = v.safeParse(AchievementIdParamsSchema, params)
  if (!result.success) throw notFound()
  return result.output
}
