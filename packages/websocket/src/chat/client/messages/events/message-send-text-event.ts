import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { messageClientEventsNamesSchema } from '../names'
import { messageClientEventPayloadSchema } from '../payload'

const payloadSchema = messageClientEventPayloadSchema.extend({
  body: z.string(),
})

// TS7056
export interface MessageSendTextClientEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const messageSendTextClientEventPayloadSchema: MessageSendTextClientEventPayloadSchema =
  payloadSchema

export type MessageSendTextClientEventPayload = z.infer<
  typeof messageSendTextClientEventPayloadSchema
>

const eventSchema = z.object({
  [messageClientEventsNamesSchema.Values['message:send:text']]:
    emitterFunction.args(messageSendTextClientEventPayloadSchema),
})

// TS7056
export interface MessageSendTextClientEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const messageSendTextClientEventSchema: MessageSendTextClientEventSchema =
  eventSchema

export type MessageSendTextClientEvent = z.infer<
  typeof messageSendTextClientEventSchema
>
