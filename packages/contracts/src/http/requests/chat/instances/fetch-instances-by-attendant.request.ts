import { z } from 'zod'

import { paginatedRequestQuerySchema } from '../../shared'

export const chatFetchInstancesByAttendantRequestQuerySchema =
	paginatedRequestQuerySchema

export type ChatFetchInstancesByAttendantRequestQuery = z.infer<
	typeof chatFetchInstancesByAttendantRequestQuerySchema
>
