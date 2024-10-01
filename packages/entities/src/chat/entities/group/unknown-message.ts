import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupUnknownMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.unknown),
})

const schema = baseGroupUnknownMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupUnknownMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupUnknownMessageSchema: GroupUnknownMessageSchema = schema

export type GroupUnknownMessage = z.infer<typeof groupUnknownMessageSchema>
