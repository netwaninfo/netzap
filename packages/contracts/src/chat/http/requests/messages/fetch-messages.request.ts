import { z } from 'zod'

import {
	instanceRequestParamsSchema,
	paginatedRequestQuerySchema,
} from '@/shared'

export const chatFetchMessagesRequestParamsSchema =
	instanceRequestParamsSchema.extend({
		waChatId: z.string(),
	})

export type ChatFetchMessagesRequestParams = z.infer<
	typeof chatFetchMessagesRequestParamsSchema
>

export const chatFetchMessagesRequestQuerySchema = paginatedRequestQuerySchema

export type ChatFetchMessagesRequestQuery = z.infer<
	typeof chatFetchMessagesRequestQuerySchema
>
