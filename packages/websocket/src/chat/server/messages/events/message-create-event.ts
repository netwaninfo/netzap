import { z } from 'zod'

import { emitterFunction } from '@/shared/index.js'
import { messageEventsNamesSchema } from '../names.js'
import { messageServerEventPayloadSchema } from '../payload.js'

const schema = messageServerEventPayloadSchema

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface MessageCreateServerEventPayloadSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const messageCreateServerEventPayloadSchema: MessageCreateServerEventPayloadSchema =
  schema

export type MessageCreateServerEventPayload = z.infer<
  typeof messageCreateServerEventPayloadSchema
>

export const messageCreateServerEventSchema = z.object({
  [messageEventsNamesSchema.Values['message:create']]: emitterFunction.args(
    messageCreateServerEventPayloadSchema
  ),
})

export type MessageCreateServerEvent = z.infer<
  typeof messageCreateServerEventSchema
>
