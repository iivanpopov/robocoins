import { z } from 'zod'

export const StepNameFormSchema = z.object({
  name: z.string().trim().min(1),
})
