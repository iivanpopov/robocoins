import * as v from 'valibot'

import { courseCategory } from '#/api/types'
import { AVATARS } from '#/routes/-constants'

export const RegisterDraftSchema = v.object({
  version: v.optional(v.literal(3), 3),
  name: v.optional(v.pipe(v.string(), v.trim(), v.minLength(1))),
  avatar: v.optional(v.picklist(AVATARS)),
  categories: v.optional(v.array(v.enum(courseCategory))),
  courseIds: v.optional(v.array(v.pipe(v.number(), v.integer(), v.minValue(1)))),
  groupIds: v.optional(v.array(v.pipe(v.number(), v.integer(), v.minValue(1)))),
})
export type RegisterDraft = v.InferOutput<typeof RegisterDraftSchema>
