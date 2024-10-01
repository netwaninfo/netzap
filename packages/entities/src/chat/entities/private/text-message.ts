import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateTextMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.text),
  body: z.string(),
})

const schema = basePrivateTextMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateTextMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateTextMessageSchema: PrivateTextMessageSchema = schema

export type PrivateTextMessage = z.infer<typeof privateTextMessageSchema>
