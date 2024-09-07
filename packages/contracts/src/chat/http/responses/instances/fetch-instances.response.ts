import { z } from 'zod'

import { paginationResponseSchema } from '@/shared'
import { instanceSchema } from '../../entities'

export const fetchInstancesResponseBodySchema = z.object({
	data: z.array(instanceSchema),
	pagination: paginationResponseSchema,
})

export type FetchInstancesResponseBody = z.infer<
	typeof fetchInstancesResponseBodySchema
>
