import { z } from 'zod'

export const StepCourseSchema = z.number().int().positive()
