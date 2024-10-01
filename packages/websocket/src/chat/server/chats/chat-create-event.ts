import { z } from 'zod'

import { emitterFunction } from '@/shared/index.js'
import { chatEvents } from '../events.js'
import { chatServerEventPayloadSchema } from '../payload.js'

const schema = chatServerEventPayloadSchema

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface ChatCreateServerEventPayloadSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const chatCreateServerEventPayloadSchema: ChatCreateServerEventPayloadSchema =
  schema

export type ChatCreateServerEventPayload = z.infer<
  typeof chatCreateServerEventPayloadSchema
>

export const chatCreateServerEventSchema = z.object({
  [chatEvents.Values['chat:create']]: emitterFunction.args(
    chatCreateServerEventPayloadSchema
  ),
})

export type ChatCreateServerEvent = z.infer<typeof chatCreateServerEventSchema>
