import type { z } from 'zod'

import { messageSendTextClientEventSchema } from './events'

export const messageClientEventsSchema = messageSendTextClientEventSchema

export type MessageClientEvents = z.infer<typeof messageClientEventsSchema>
