import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { chatClientEventsNamesSchema } from '../names'
import { chatClientEventPayloadSchema } from '../payload'

const payloadSchema = chatClientEventPayloadSchema

// TS7056
export interface ChatReadClientEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const chatReadClientEventPayloadSchema: ChatReadClientEventPayloadSchema =
  payloadSchema

export type ChatReadClientEventPayload = z.infer<
  typeof chatReadClientEventPayloadSchema
>

const eventSchema = z.object({
  [chatClientEventsNamesSchema.Values['chat:read']]: emitterFunction.args(
    chatReadClientEventPayloadSchema
  ),
})

// TS7056
export interface ChatReadClientEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const chatReadClientEventSchema: ChatReadClientEventSchema = eventSchema

export type ChatReadClientEvent = z.infer<typeof chatReadClientEventSchema>
