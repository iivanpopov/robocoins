import { z } from 'zod'

import { courseCategory } from '#/api/types'

export const StepCategorySchema = z.array(z.enum(courseCategory)).min(1)
