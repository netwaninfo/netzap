import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateUnknownMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.unknown),
})

const schema = basePrivateUnknownMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateUnknownMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateUnknownMessageSchema: PrivateUnknownMessageSchema = schema

export type PrivateUnknownMessage = z.infer<typeof privateUnknownMessageSchema>
