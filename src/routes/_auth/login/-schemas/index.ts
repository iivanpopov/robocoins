import * as v from 'valibot'

export const LoginStateSchema = v.object({
  password: v.pipe(v.string(), v.minLength(1), v.maxLength(128)),
})
