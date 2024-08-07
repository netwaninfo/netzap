import { z } from 'zod'

export const instanceStatus = z.enum([
	'stopped',
	'starting',
	'initialized',
	'failed',
	'connected',
	'disconnected',
])

export type InstanceStatus = z.infer<typeof instanceStatus>
