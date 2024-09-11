import z from 'zod'

import {
  instanceRequestParamsSchema,
  paginatedRequestQuerySchema,
} from '@/shared/index.js'

export const fetchMessagesRequestParamsSchema =
  instanceRequestParamsSchema.extend({
    waChatId: z.string(),
  })

export type FetchMessagesRequestParams = z.infer<
  typeof fetchMessagesRequestParamsSchema
>

export const fetchMessagesRequestQuerySchema = paginatedRequestQuerySchema

export type FetchMessagesRequestQuery = z.infer<
  typeof fetchMessagesRequestQuerySchema
>
