import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { messageEventsNamesSchema } from '../names'
import { messageServerEventPayloadSchema } from '../payload'

const payloadSchema = messageServerEventPayloadSchema

// TS7056
export interface MessageChangeServerEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const messageChangeServerEventPayloadSchema: MessageChangeServerEventPayloadSchema =
  payloadSchema

export type MessageChangeServerEventPayload = z.infer<
  typeof messageChangeServerEventPayloadSchema
>

const eventSchema = z.object({
  [messageEventsNamesSchema.Values['message:change']]: emitterFunction.args(
    messageChangeServerEventPayloadSchema
  ),
})

// TS7056
export interface MessageChangeServerEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const messageChangeServerEventSchema: MessageChangeServerEventSchema =
  eventSchema

export type MessageChangeServerEvent = z.infer<
  typeof messageChangeServerEventSchema
>
