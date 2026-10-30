import * as v from 'valibot'

import { TeacherNameSchema } from './teacher-name'

export const TeacherRegistrationSchema = v.object({
  name: TeacherNameSchema,
})
