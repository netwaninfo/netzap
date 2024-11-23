import { z } from 'zod'

import { emitterFunction } from '@/shared'
import { chatEventsNamesSchema } from '../names'
import { chatServerEventPayloadSchema } from '../payload'

const payloadSchema = chatServerEventPayloadSchema

// TS7056
export interface ChatCreateServerEventPayloadSchema
  extends z.ZodType<
    z.output<typeof payloadSchema>,
    z.ZodTypeDef,
    z.input<typeof payloadSchema>
  > {}
// ------

export const chatCreateServerEventPayloadSchema: ChatCreateServerEventPayloadSchema =
  payloadSchema

export type ChatCreateServerEventPayload = z.infer<
  typeof chatCreateServerEventPayloadSchema
>

const eventSchema = z.object({
  [chatEventsNamesSchema.Values['chat:create']]: emitterFunction.args(
    chatCreateServerEventPayloadSchema
  ),
})

// TS7056
export interface ChatCreateServerEventSchema
  extends z.ZodType<
    z.output<typeof eventSchema>,
    z.ZodTypeDef,
    z.input<typeof eventSchema>
  > {}
// ------

export const chatCreateServerEventSchema: ChatCreateServerEventSchema =
  eventSchema

export type ChatCreateServerEvent = z.infer<typeof chatCreateServerEventSchema>
