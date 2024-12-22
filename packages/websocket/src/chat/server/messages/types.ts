import type { z } from 'zod'

import {
  messageChangeServerEventSchema,
  messageCreateServerEventSchema,
  messageRevokedServerEventSchema,
} from './events'

export const messageServerEventsSchema = messageChangeServerEventSchema
  .and(messageCreateServerEventSchema)
  .and(messageRevokedServerEventSchema)

export type MessageServerEvents = z.infer<typeof messageServerEventsSchema>
