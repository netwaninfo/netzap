import { z } from 'zod'

export const chatClientEventsNamesSchema = z.enum(['chat:read', 'chat:unread'])

export type ChatClientEventsNames = z.infer<typeof chatClientEventsNamesSchema>
