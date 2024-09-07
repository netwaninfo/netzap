import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'
import { chatSchema } from '../../types'

export const fetchChatsResponseBodySchema = z.object({
	data: z.array(chatSchema),
	pagination: paginationResponseSchema,
})

export type FetchChatsResponseBody = z.infer<
	typeof fetchChatsResponseBodySchema
>
