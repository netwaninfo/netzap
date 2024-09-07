import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'
import { messageSchema } from '../../types'

export const fetchMessagesResponseBodySchema = z.object({
	data: z.array(messageSchema),
	pagination: paginationResponseSchema,
})

export type FetchMessagesResponseBody = z.infer<
	typeof fetchMessagesResponseBodySchema
>
