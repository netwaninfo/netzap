import { chatSchema } from '@netzap/entities/chat'
import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'

export const fetchChatsResponseBodySchema = z.object({
  data: z.array(chatSchema),
  pagination: paginationResponseSchema,
})

export type FetchChatsResponseBody = z.infer<
  typeof fetchChatsResponseBodySchema
>
