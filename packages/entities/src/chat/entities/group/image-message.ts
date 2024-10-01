import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupImageMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.image),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

const schema = baseGroupImageMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupImageMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupImageMessageSchema: GroupImageMessageSchema = schema

export type GroupImageMessage = z.infer<typeof groupImageMessageSchema>
