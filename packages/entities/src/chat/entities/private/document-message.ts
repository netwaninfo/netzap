import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateDocumentMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.document),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

const schema = basePrivateDocumentMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateDocumentMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateDocumentMessageSchema: PrivateDocumentMessageSchema = schema

export type PrivateDocumentMessage = z.infer<
  typeof privateDocumentMessageSchema
>
