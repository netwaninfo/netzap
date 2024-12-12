import { z } from 'zod'

export const chatClientEventsNamesSchema = z.enum(['chat:read'])

export type ChatClientEventsNames = z.infer<typeof chatClientEventsNamesSchema>
