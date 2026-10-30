import { notFound } from '@tanstack/react-router'
import * as v from 'valibot'

import { GroupIdParamsSchema } from '../-schemas'

export function parseGroupIdParams(params: { groupId: string }) {
  const result = v.safeParse(GroupIdParamsSchema, params)
  if (!result.success) throw notFound()
  return result.output
}
