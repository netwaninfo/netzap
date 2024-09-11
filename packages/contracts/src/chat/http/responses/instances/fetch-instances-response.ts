import z from 'zod'

import { paginationResponseSchema } from '@/shared/index.js'
import { instanceSchema } from '../../entities/index.js'

export const fetchInstancesResponseBodySchema = z.object({
	data: z.array(instanceSchema),
	pagination: paginationResponseSchema,
})

export type FetchInstancesResponseBody = z.infer<
	typeof fetchInstancesResponseBodySchema
>
