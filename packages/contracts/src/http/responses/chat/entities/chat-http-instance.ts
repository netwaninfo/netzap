import { z } from 'zod'

import { instanceStatus } from '@/enums'

export const chatHttpInstanceSchema = z.object({
	id: z.string(),
	name: z.string(),
	phone: z.string(),
	status: instanceStatus,
})

export type ChatHttpInstance = z.infer<typeof chatHttpInstanceSchema>
