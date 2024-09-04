import { z } from 'zod'

import { paginationResponseSchema } from '../../shared'
import { chatHttpInstanceSchema } from '../entities'

export const chatFetchInstancesResponseBodySchema = z.object({
	data: z.array(chatHttpInstanceSchema),
	pagination: paginationResponseSchema,
})

export type ChatFetchInstancesResponseBody = z.infer<
	typeof chatFetchInstancesResponseBodySchema
>
