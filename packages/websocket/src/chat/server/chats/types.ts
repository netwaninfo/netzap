import type { z } from 'zod'

import {
  chatChangeServerEventSchema,
  chatCreateServerEventSchema,
} from './events'

export const chatServerEventsSchema = chatChangeServerEventSchema.and(
  chatCreateServerEventSchema
)

export type ChatServerEvents = z.infer<typeof chatServerEventsSchema>
