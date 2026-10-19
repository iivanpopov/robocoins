import { z } from 'zod'

export const StepNameForm = z.object({
  name: z.string().trim().min(1),
})
