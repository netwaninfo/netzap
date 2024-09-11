import z from 'zod'

import { paginationResponseSchema } from '@/shared/index.js'
import { chatSchema } from '../../types/index.js'

export const fetchChatsResponseBodySchema = z.object({
	data: z.array(chatSchema),
	pagination: paginationResponseSchema,
})

export type FetchChatsResponseBody = z.infer<
	typeof fetchChatsResponseBodySchema
>
