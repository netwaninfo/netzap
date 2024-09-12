import z from 'zod'

export const instanceStatusSchema = z.enum(['connected', 'disconnected'])

export type InstanceStatus = z.infer<typeof instanceStatusSchema>

export const instanceStateSchema = z.enum([
  'stopped',
  'starting',
  'initialized',
  'failed',
])

export type InstanceState = z.infer<typeof instanceStateSchema>
