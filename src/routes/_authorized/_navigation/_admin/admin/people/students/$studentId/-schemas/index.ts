import * as v from 'valibot'

import { AVATARS } from '#/routes/-constants'

export const StudentIdParamsSchema = v.object({
  studentId: v.pipe(
    v.string(),
    v.regex(/^\d+$/),
    v.transform(Number),
    v.safeInteger(),
    v.minValue(1),
  ),
})

export const StudentNicknameSchema = v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200))
export const StudentAvatarSchema = v.picklist(AVATARS)

export const EditStudentNicknameStateSchema = v.object({
  nickname: StudentNicknameSchema,
})

export const EditStudentAvatarStateSchema = v.object({
  avatar: StudentAvatarSchema,
})

export const DeleteStudentStateSchema = v.object({
  confirmation: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200)),
})
