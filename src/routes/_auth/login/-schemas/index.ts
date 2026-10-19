import { z } from 'zod'

export const LoginStateSchema = z.object({
  password: z.string().min(1),
})
