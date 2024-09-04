import { z } from 'zod'

import { paginationResponseSchema } from '../../shared'
import { chatHttpChatSchema } from '../entities'

export const chatFetchChatsResponseBodySchema = z.object({
	data: z.array(chatHttpChatSchema),
	pagination: paginationResponseSchema,
})

export type ChatFetchChatsResponseBody = z.infer<
	typeof chatFetchChatsResponseBodySchema
>
