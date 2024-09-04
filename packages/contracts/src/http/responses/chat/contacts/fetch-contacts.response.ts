import { z } from 'zod'

import { paginationResponseSchema } from '../../shared'
import { chatHttpContactSchema } from '../entities'

export const chatFetchContactsResponseBodySchema = z.object({
	data: z.array(chatHttpContactSchema),
	pagination: paginationResponseSchema,
})

export type ChatFetchContactsResponseBody = z.infer<
	typeof chatFetchContactsResponseBodySchema
>
