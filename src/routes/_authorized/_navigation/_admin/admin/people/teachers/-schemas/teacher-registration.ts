import * as v from 'valibot'

export const TeacherRegistrationSchema = v.object({
  name: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(200)),
})
