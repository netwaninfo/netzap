import { z } from 'zod'

import {
  messageChangeServerEventSchema,
  messageCreateServerEventSchema,
  messageRevokedServerEventSchema,
} from './events/index.js'

export const messageServerEventsSchema = messageChangeServerEventSchema
  .and(messageCreateServerEventSchema)
  .and(messageCreateServerEventSchema)
  .and(messageRevokedServerEventSchema)

export type MessageServerEvents = z.infer<typeof messageServerEventsSchema>
