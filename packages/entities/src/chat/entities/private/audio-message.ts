import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateAudioMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.audio),
  media: messageMediaSchema.nullable(),
})

const schema = basePrivateAudioMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateAudioMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateAudioMessageSchema: PrivateAudioMessageSchema = schema

export type PrivateAudioMessage = z.infer<typeof privateAudioMessageSchema>
