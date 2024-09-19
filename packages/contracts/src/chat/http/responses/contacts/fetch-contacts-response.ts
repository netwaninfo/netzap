import z from 'zod'

import { paginationResponseSchema } from '@/shared/index.js'
import { contactSchema } from '../../entities/index.js'

export const fetchContactsResponseBodySchema = z.object({
  data: z.array(contactSchema),
  pagination: paginationResponseSchema,
})

export type FetchContactsResponseBody = z.infer<
  typeof fetchContactsResponseBodySchema
>