import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupTextMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.text),
  body: z.string(),
})

const schema = baseGroupTextMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupTextMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupTextMessageSchema: GroupTextMessageSchema = schema

export type GroupTextMessage = z.infer<typeof groupTextMessageSchema>
