import * as v from 'valibot'

import { courseCategory } from '#/api/types'

export const StepCategorySchema = v.pipe(v.array(v.enum(courseCategory)), v.minLength(1))
