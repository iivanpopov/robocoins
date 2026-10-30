import * as v from 'valibot'

import { AVATARS } from '#/routes/-constants'

export const RegisterStudentFormSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1)),
  avatar: v.picklist(AVATARS),
  groupIds: v.pipe(v.array(v.number()), v.minLength(1)),
})

export type RegisterStudentFormValues = v.InferOutput<typeof RegisterStudentFormSchema>
