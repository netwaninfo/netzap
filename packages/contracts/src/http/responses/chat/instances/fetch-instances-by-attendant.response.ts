import { z } from 'zod'

import { paginationResponseSchema } from '../../shared'
import { chatHttpInstanceSchema } from '../entities'

export const fetchInstancesByAttendantResponseBodySchema = z.object({
	data: z.array(chatHttpInstanceSchema),
	pagination: paginationResponseSchema,
})

export type FetchInstancesByAttendantResponseBody = z.infer<
	typeof fetchInstancesByAttendantResponseBodySchema
>
