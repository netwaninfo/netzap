import { z } from 'zod'

import { emitterFunction } from '@/shared/index.js'
import { messageEventsNamesSchema } from '../names.js'
import { messageServerEventPayloadSchema } from '../payload.js'

const schema = messageServerEventPayloadSchema

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface MessageRevokedServerEventPayloadSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const messageRevokedServerEventPayloadSchema: MessageRevokedServerEventPayloadSchema =
  schema

export type MessageRevokedServerEventPayload = z.infer<
  typeof messageRevokedServerEventPayloadSchema
>

export const messageRevokedServerEventSchema = z.object({
  [messageEventsNamesSchema.Values['message:revoked']]: emitterFunction.args(
    messageRevokedServerEventPayloadSchema
  ),
})

export type MessageRevokedServerEvent = z.infer<
  typeof messageRevokedServerEventSchema
>
