import { z } from 'zod'

import {
	instanceRequestParamsSchema,
	paginatedRequestQuerySchema,
} from '../../shared'

export const chatFetchChatsRequestParamsSchema = instanceRequestParamsSchema

export type ChatFetchChatsRequestParams = z.infer<
	typeof chatFetchChatsRequestParamsSchema
>

export const chatFetchChatsRequestQuerySchema = paginatedRequestQuerySchema

export type ChatFetchChatsRequestQuery = z.infer<
	typeof chatFetchChatsRequestQuerySchema
>
