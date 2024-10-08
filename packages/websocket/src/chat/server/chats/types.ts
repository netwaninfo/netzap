import { z } from 'zod'

import {
  chatChangeServerEventSchema,
  chatCreateServerEventSchema,
} from './events/index.js'

export const chatServerEventsSchema = chatChangeServerEventSchema.and(
  chatCreateServerEventSchema
)

export type ChatServerEvents = z.infer<typeof chatServerEventsSchema>
