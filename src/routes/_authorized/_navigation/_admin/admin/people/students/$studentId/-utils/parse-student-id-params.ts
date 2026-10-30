import { notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { StudentIdParamsSchema } from '../-schemas'

export function parseStudentIdParams(params: Record<string, string>) {
  const result = v.safeParse(StudentIdParamsSchema, params)
  if (!result.success) throw notFound()
  return result.output
}
