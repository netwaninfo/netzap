import { z } from 'zod'

import { paginatedRequestQuerySchema } from '../../shared'

export const chatFetchInstancesRequestQuerySchema = paginatedRequestQuerySchema

export type ChatFetchInstancesRequestQuery = z.infer<
	typeof chatFetchInstancesRequestQuerySchema
>
