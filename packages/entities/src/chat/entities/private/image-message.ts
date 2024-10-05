import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateImageMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.image),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

const schema = basePrivateImageMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateImageMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateImageMessageSchema: PrivateImageMessageSchema = schema

export type PrivateImageMessage = z.infer<typeof privateImageMessageSchema>