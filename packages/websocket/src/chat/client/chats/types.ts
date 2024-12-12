import { z } from 'zod'

import { chatReadClientEventSchema } from './events'

export const chatClientEventsSchema = chatReadClientEventSchema

export type ChatClientEvents = z.infer<typeof chatClientEventsSchema>
