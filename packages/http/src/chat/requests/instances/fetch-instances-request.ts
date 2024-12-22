import type { z } from 'zod'

import { paginatedRequestQuerySchema } from '@/shared'

export const fetchInstancesRequestQuerySchema = paginatedRequestQuerySchema

export type FetchInstancesRequestQuery = z.infer<
  typeof fetchInstancesRequestQuerySchema
>
