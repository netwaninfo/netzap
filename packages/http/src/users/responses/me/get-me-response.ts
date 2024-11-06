import { userSchema } from '@netzap/entities/users'
import { z } from 'zod'

export const getMeResponseBodySchema = z.object({
  data: userSchema,
})

export type GetMeResponseBody = z.infer<typeof getMeResponseBodySchema>
