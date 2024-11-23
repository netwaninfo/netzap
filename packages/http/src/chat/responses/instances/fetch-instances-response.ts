import { instanceSchema } from '@netzap/entities/chat'
import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'

export const fetchInstancesResponseBodySchema = z.object({
  data: z.array(instanceSchema),
  pagination: paginationResponseSchema,
})

export type FetchInstancesResponseBody = z.infer<
  typeof fetchInstancesResponseBodySchema
>
