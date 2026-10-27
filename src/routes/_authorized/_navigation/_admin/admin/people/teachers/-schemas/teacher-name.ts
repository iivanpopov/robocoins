import * as v from 'valibot'

export const TeacherNameSchema = v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200))
