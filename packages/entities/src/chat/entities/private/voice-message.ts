import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateVoiceMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.voice),
  media: messageMediaSchema.nullable(),
})

const schema = basePrivateVoiceMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateVoiceMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateVoiceMessageSchema: PrivateVoiceMessageSchema = schema

export type PrivateVoiceMessage = z.infer<typeof privateVoiceMessageSchema>
