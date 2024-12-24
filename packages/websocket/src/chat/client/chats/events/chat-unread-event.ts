import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { chatClientEventsNamesSchema } from '../names'
import { chatClientEventPayloadSchema } from '../payload'

const payloadSchema = chatClientEventPayloadSchema

// TS7056
export interface ChatUnreadClientEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const chatUnreadClientEventPayloadSchema: ChatUnreadClientEventPayloadSchema =
  payloadSchema

export type ChatUnreadClientEventPayload = z.infer<
  typeof chatUnreadClientEventPayloadSchema
>

const eventSchema = z.object({
  [chatClientEventsNamesSchema.Values['chat:unread']]: emitterFunction.args(
    chatUnreadClientEventPayloadSchema
  ),
})

// TS7056
export interface ChatUnreadClientEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const chatUnreadClientEventSchema: ChatUnreadClientEventSchema =
  eventSchema

export type ChatUnreadClientEvent = z.infer<typeof chatUnreadClientEventSchema>
