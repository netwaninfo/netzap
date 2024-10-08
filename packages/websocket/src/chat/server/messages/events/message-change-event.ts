import { z } from 'zod'

import { emitterFunction } from '@/shared/index.js'
import { messageEventsNamesSchema } from '../names.js'
import { messageServerEventPayloadSchema } from '../payload.js'

const schema = messageServerEventPayloadSchema

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface MessageChangeServerEventPayloadSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const messageChangeServerEventPayloadSchema: MessageChangeServerEventPayloadSchema =
  schema

export type MessageChangeServerEventPayload = z.infer<
  typeof messageChangeServerEventPayloadSchema
>

export const messageChangeServerEventSchema = z.object({
  [messageEventsNamesSchema.Values['message:change']]: emitterFunction.args(
    messageChangeServerEventPayloadSchema
  ),
})

export type MessageChangeServerEvent = z.infer<
  typeof messageChangeServerEventSchema
>
