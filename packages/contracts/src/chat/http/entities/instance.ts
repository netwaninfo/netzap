import z from 'zod'

import {
  instanceStateSchema,
  instanceStatusSchema,
} from '@/management/index.js'

export const instanceSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string(),
  status: instanceStatusSchema,
  state: instanceStateSchema,
})

export type Instance = z.infer<typeof instanceSchema>
