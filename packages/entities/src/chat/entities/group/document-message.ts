import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupDocumentMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.document),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

const schema = baseGroupDocumentMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupDocumentMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupDocumentMessageSchema: GroupDocumentMessageSchema = schema

export type GroupDocumentMessage = z.infer<typeof groupDocumentMessageSchema>
