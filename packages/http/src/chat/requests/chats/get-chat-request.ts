import { z } from 'zod'

import {
  instanceRequestParamsSchema,
  paginatedRequestQuerySchema,
} from '@/shared'

export const getChatRequestParamsSchema = instanceRequestParamsSchema.extend({
  waChatId: z.string(),
})

export type GetChatRequestParams = z.infer<typeof getChatRequestParamsSchema>

export const getChatRequestQuerySchema = paginatedRequestQuerySchema

export type GetChatRequestQuery = z.infer<typeof getChatRequestQuerySchema>
