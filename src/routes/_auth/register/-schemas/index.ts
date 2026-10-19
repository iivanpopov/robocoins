import { z } from 'zod'

import { AVATARS } from '../-constants'

export const RegisterDraft = z.object({
  version: z.number(),
  name: z.string().trim().min(1).optional(),
  avatar: z.enum(AVATARS).optional(),
  groups: z
    .array(
      z.object({
        id: z.number().int().positive(),
        name: z.string(),
        courseName: z.string(),
      }),
    )
    .optional(),
})
export type RegisterDraft = z.infer<typeof RegisterDraft>

export const CompleteRegisterDraft = RegisterDraft.required()
