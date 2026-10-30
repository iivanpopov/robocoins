import * as v from 'valibot'

import { TeacherNameSchema } from './teacher-name'

export * from './teacher-name'
export * from './teacher-registration'

export const TeacherIdParamsSchema = v.object({
  userId: v.pipe(v.string(), v.regex(/^\d+$/), v.transform(Number), v.safeInteger(), v.minValue(1)),
})

export const RenameTeacherStateSchema = v.object({
  name: TeacherNameSchema,
})

export const DeleteTeacherStateSchema = v.object({
  confirmation: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200)),
})
