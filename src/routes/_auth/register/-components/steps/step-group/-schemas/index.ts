import { z } from 'zod'

export const StepGroupSchema = z.number().int().positive()
