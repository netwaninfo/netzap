import { instanceStatusSchema } from '@netzap/entities/management'
import type { z } from 'zod'

import { paginatedRequestQuerySchema } from '@/shared'

export const fetchInstancesRequestQuerySchema =
  paginatedRequestQuerySchema.extend({
    status: instanceStatusSchema.optional(),
  })

export type FetchInstancesRequestQuery = z.infer<
  typeof fetchInstancesRequestQuerySchema
>
