import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupVideoMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.video),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

const schema = baseGroupVideoMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupVideoMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupVideoMessageSchema: GroupVideoMessageSchema = schema

export type GroupVideoMessage = z.infer<typeof groupVideoMessageSchema>
