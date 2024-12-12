import { z } from 'zod'

export const messageServerEventsNamesSchema = z.enum([
  'message:change',
  'message:revoked',
  'message:create',
])

export type MessageServerEventsNames = z.infer<
  typeof messageServerEventsNamesSchema
>
