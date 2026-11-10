import * as v from 'valibot'

export const StudentNicknameSchema = v.pipe(
  v.string(),
  v.transform((value) => value.trim()),
  v.minLength(1),
  v.maxLength(200),
)
