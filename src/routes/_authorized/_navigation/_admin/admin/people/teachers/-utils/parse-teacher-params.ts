import { notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { TeacherIdParamsSchema } from '../-schemas'

export function parseTeacherIdParams(params: Record<string, string>) {
  const result = v.safeParse(TeacherIdParamsSchema, params)
  if (!result.success) throw notFound()
  return result.output
}
