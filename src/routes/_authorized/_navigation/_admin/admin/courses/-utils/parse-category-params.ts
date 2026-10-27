import { notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { CategoryKeyParamsSchema } from '../-schemas'

export function parseCategoryKeyParams(params: Record<string, string>) {
  const result = v.safeParse(CategoryKeyParamsSchema, params)
  if (!result.success) throw notFound()
  return result.output
}
