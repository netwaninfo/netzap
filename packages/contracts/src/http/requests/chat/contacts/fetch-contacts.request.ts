import { z } from 'zod'

import {
	instanceRequestParamsSchema,
	paginatedRequestQuerySchema,
	searchableRequestQuerySchema,
} from '../../shared'

export const chatFetchContactsRequestParamsSchema = instanceRequestParamsSchema

export type ChatFetchContactsRequestParams = z.infer<
	typeof chatFetchContactsRequestParamsSchema
>

export const chatFetchContactsRequestQuerySchema =
	paginatedRequestQuerySchema.merge(searchableRequestQuerySchema)

export type ChatFetchContactsRequestQuery = z.infer<
	typeof chatFetchContactsRequestQuerySchema
>
