import { z } from 'zod'

import { emitterFunction } from '@/shared/index.js'
import { chatEvents } from '../events.js'
import { chatServerEventPayloadSchema } from '../payload.js'

const schema = chatServerEventPayloadSchema

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface ChatChangeServerEventPayloadSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const chatChangeServerEventPayloadSchema: ChatChangeServerEventPayloadSchema =
  schema

export type ChatChangeServerEventPayload = z.infer<
  typeof chatChangeServerEventPayloadSchema
>

export const chatChangeServerEventSchema = z.object({
  [chatEvents.Values['chat:change']]: emitterFunction.args(
    chatChangeServerEventPayloadSchema
  ),
})

export type ChatChangeServerEvent = z.infer<typeof chatChangeServerEventSchema>
