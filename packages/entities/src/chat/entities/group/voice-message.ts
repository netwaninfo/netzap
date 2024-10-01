import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupVoiceMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.voice),
  media: messageMediaSchema.nullable(),
})

const schema = baseGroupVoiceMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupVoiceMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupVoiceMessageSchema: GroupVoiceMessageSchema = schema

export type GroupVoiceMessage = z.infer<typeof groupVoiceMessageSchema>
