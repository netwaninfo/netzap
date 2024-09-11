import z from 'zod'

import {
  instanceRequestParamsSchema,
  paginatedRequestQuerySchema,
  searchableRequestQuerySchema,
} from '@/shared/index.js'

export const fetchContactsRequestParamsSchema = instanceRequestParamsSchema

export type FetchContactsRequestParams = z.infer<
  typeof fetchContactsRequestParamsSchema
>

export const fetchContactsRequestQuerySchema =
  paginatedRequestQuerySchema.merge(searchableRequestQuerySchema)

export type FetchContactsRequestQuery = z.infer<
  typeof fetchContactsRequestQuerySchema
>
