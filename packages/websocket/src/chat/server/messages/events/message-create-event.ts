import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { messageServerEventsNamesSchema } from '../names'
import { messageServerEventPayloadSchema } from '../payload'

const payloadSchema = messageServerEventPayloadSchema

// TS7056
export interface MessageCreateServerEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const messageCreateServerEventPayloadSchema: MessageCreateServerEventPayloadSchema =
  payloadSchema

export type MessageCreateServerEventPayload = z.infer<
  typeof messageCreateServerEventPayloadSchema
>

const eventSchema = z.object({
  [messageServerEventsNamesSchema.Values['message:create']]:
    emitterFunction.args(messageCreateServerEventPayloadSchema),
})

// TS7056
export interface MessageCreateServerEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const messageCreateServerEventSchema: MessageCreateServerEventSchema =
  eventSchema

export type MessageCreateServerEvent = z.infer<
  typeof messageCreateServerEventSchema
>
