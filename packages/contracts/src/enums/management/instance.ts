import { z } from 'zod'

export const instanceState = z.enum([
	'initialized',
	'failed',
	'authenticated',
	'connected',
	'disconnected',
])

export type InstanceState = z.infer<typeof instanceState>
