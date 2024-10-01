import { z } from 'zod'

import {
  chatChangeServerEventSchema,
  chatCreateServerEventSchema,
} from '../server/index.js'

export const chatServerEventsSchema = z.intersection(
  chatChangeServerEventSchema,
  chatCreateServerEventSchema
)

export type ChatServerEvents = z.infer<typeof chatServerEventsSchema>
