import { z } from 'zod'

export const chatEventsNamesSchema = z.enum(['chat:change', 'chat:create'])

export type ChatEventsNames = z.infer<typeof chatEventsNamesSchema>
