import { z } from 'zod'

import { chatClientEventsSchema, messageClientEventsSchema } from '../client'

export const clientEventsSchema = z.intersection(
  chatClientEventsSchema,
  messageClientEventsSchema
)

export type ClientEvents = z.infer<typeof clientEventsSchema>
