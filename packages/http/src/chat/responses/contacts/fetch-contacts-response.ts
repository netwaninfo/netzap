import { contactSchema } from '@netzap/entities/chat'
import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'

export const fetchContactsResponseBodySchema = z.object({
  data: z.array(contactSchema),
  pagination: paginationResponseSchema,
})

export type FetchContactsResponseBody = z.infer<
  typeof fetchContactsResponseBodySchema
>
