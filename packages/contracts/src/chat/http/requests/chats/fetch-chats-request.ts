import { z } from 'zod'

import {
  instanceRequestParamsSchema,
  paginatedRequestQuerySchema,
} from '@/shared/index.js'

export const fetchChatsRequestParamsSchema = instanceRequestParamsSchema

export type FetchChatsRequestParams = z.infer<
  typeof fetchChatsRequestParamsSchema
>

export const fetchChatsRequestQuerySchema = paginatedRequestQuerySchema

export type FetchChatsRequestQuery = z.infer<
  typeof fetchChatsRequestQuerySchema
>
