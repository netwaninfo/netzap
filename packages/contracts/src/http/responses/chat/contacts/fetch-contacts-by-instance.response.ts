import { z } from 'zod'

import { paginationResponseSchema } from '../../shared'
import { chatHttpContactSchema } from '../entities'

export const fetchContactsByInstanceResponseBodySchema = z.object({
	data: z.array(chatHttpContactSchema),
	pagination: paginationResponseSchema,
})

export type FetchContactsByInstanceResponseBody = z.infer<
	typeof fetchContactsByInstanceResponseBodySchema
>
