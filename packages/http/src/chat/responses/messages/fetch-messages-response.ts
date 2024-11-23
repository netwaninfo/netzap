import { messageSchema } from '@netzap/entities/chat'
import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'

export const fetchMessagesResponseBodySchema = z.object({
  data: z.array(messageSchema),
  pagination: paginationResponseSchema,
})

export type FetchMessagesResponseBody = z.infer<
  typeof fetchMessagesResponseBodySchema
>
