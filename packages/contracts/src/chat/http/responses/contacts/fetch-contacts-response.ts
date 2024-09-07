import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'
import { contactSchema } from '../../entities'

export const fetchContactsResponseBodySchema = z.object({
	data: z.array(contactSchema),
	pagination: paginationResponseSchema,
})

export type FetchContactsResponseBody = z.infer<
	typeof fetchContactsResponseBodySchema
>
