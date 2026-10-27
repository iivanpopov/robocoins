import { notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { CourseIdParamsSchema } from '../-schemas'

export function parseCourseIdParams(params: Record<string, string>) {
  const result = v.safeParse(CourseIdParamsSchema, params)
  if (!result.success) throw notFound()
  return result.output
}
