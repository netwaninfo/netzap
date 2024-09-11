import z from 'zod'

export const instanceStatusSchema = z.enum([
	'stopped',
	'starting',
	'initialized',
	'failed',
	'connected',
	'disconnected',
])

export type InstanceStatus = z.infer<typeof instanceStatusSchema>
