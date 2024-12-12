import { z } from 'zod'

export const chatServerEventsNamesSchema = z.enum([
  'chat:change',
  'chat:create',
])

export type ChatServerEventsNames = z.infer<typeof chatServerEventsNamesSchema>
