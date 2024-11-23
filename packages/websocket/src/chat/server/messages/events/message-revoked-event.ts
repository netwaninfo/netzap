import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { messageEventsNamesSchema } from '../names'
import { messageServerEventPayloadSchema } from '../payload'

const payloadSchema = messageServerEventPayloadSchema

// TS7056
export interface MessageRevokedServerEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const messageRevokedServerEventPayloadSchema: MessageRevokedServerEventPayloadSchema =
  payloadSchema

export type MessageRevokedServerEventPayload = z.infer<
  typeof messageRevokedServerEventPayloadSchema
>

const eventSchema = z.object({
  [messageEventsNamesSchema.Values['message:revoked']]: emitterFunction.args(
    messageRevokedServerEventPayloadSchema
  ),
})

// TS7056
export interface MessageRevokedServerEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const messageRevokedServerEventSchema: MessageRevokedServerEventSchema =
  eventSchema

export type MessageRevokedServerEvent = z.infer<
  typeof messageRevokedServerEventSchema
>
