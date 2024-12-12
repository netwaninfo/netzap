import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { chatServerEventsNamesSchema } from '../names'
import { chatServerEventPayloadSchema } from '../payload'

const payloadSchema = chatServerEventPayloadSchema

// TS7056
export interface ChatChangeServerEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const chatChangeServerEventPayloadSchema: ChatChangeServerEventPayloadSchema =
  payloadSchema

export type ChatChangeServerEventPayload = z.infer<
  typeof chatChangeServerEventPayloadSchema
>

const eventSchema = z.object({
  [chatServerEventsNamesSchema.Values['chat:change']]: emitterFunction.args(
    chatChangeServerEventPayloadSchema
  ),
})

// TS7056
export interface ChatChangeServerEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const chatChangeServerEventSchema: ChatChangeServerEventSchema =
  eventSchema

export type ChatChangeServerEvent = z.infer<typeof chatChangeServerEventSchema>
