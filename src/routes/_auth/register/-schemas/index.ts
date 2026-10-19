import { z } from 'zod'

import { courseCategory } from '#/api/types'

import { AVATARS } from '../-constants'

export const RegisterDraftSchema = z.object({
  version: z.literal(3).default(3),
  name: z.string().trim().min(1).optional(),
  avatar: z.enum(AVATARS).optional(),
  categories: z.array(z.enum(courseCategory)).default([]).optional(),
  courseIds: z.array(z.number().int().positive()).default([]).optional(),
  groupIds: z.array(z.number().int().positive()).default([]).optional(),
})
export type RegisterDraft = z.infer<typeof RegisterDraftSchema>
