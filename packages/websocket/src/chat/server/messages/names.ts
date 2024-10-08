import { z } from 'zod'

export const messageEventsNamesSchema = z.enum([
  'message:change',
  'message:revoked',
  'message:create',
])

export type MessageEventsNames = z.infer<typeof messageEventsNamesSchema>
