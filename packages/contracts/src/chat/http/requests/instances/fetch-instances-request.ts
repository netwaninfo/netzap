import z from 'zod'

import { paginatedRequestQuerySchema } from '@/shared/index.js'

export const fetchInstancesRequestQuerySchema = paginatedRequestQuerySchema

export type FetchInstancesRequestQuery = z.infer<
	typeof fetchInstancesRequestQuerySchema
>
