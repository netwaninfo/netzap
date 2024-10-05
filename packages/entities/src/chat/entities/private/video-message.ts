import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateVideoMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.video),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

const schema = basePrivateVideoMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateVideoMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateVideoMessageSchema: PrivateVideoMessageSchema = schema

export type PrivateVideoMessage = z.infer<typeof privateVideoMessageSchema>