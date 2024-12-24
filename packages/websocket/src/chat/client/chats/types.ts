import type { z } from 'zod'

import {
  chatReadClientEventSchema,
  chatUnreadClientEventSchema,
} from './events'

export const chatClientEventsSchema = chatReadClientEventSchema.and(
  chatUnreadClientEventSchema
)

export type ChatClientEvents = z.infer<typeof chatClientEventsSchema>
