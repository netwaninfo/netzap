import { z } from 'zod'

export const instanceStatus = z.enum([
	'initialized',
	'failed',
	'authenticated',
	'connected',
	'disconnected',
])

export type InstanceStatus = z.infer<typeof instanceStatus>
