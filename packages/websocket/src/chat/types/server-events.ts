import { z } from 'zod'

import {
  chatServerEventsSchema,
  messageServerEventsSchema,
} from '../server/index.js'

export const serverEventsSchema = z.intersection(
  chatServerEventsSchema,
  messageServerEventsSchema
)

export type ServerEvents = z.infer<typeof serverEventsSchema>
