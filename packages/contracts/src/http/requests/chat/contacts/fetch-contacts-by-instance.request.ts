import { z } from 'zod'

import {
	instanceRequestParamsSchema,
	paginatedRequestQuerySchema,
	searchableRequestQuerySchema,
} from '../../shared'

export const chatFetchContactsByInstancesRequestParamsSchema =
	instanceRequestParamsSchema

export type ChatFetchContactsByInstancesRequestParams = z.infer<
	typeof chatFetchContactsByInstancesRequestParamsSchema
>

export const chatFetchContactsByInstanceRequestQuerySchema =
	paginatedRequestQuerySchema.merge(searchableRequestQuerySchema)

export type ChatFetchContactsByInstanceRequestQuery = z.infer<
	typeof chatFetchContactsByInstanceRequestQuerySchema
>
