import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupAudioMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.audio),
  media: messageMediaSchema.nullable(),
})

const schema = baseGroupAudioMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupAudioMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupAudioMessageSchema: GroupAudioMessageSchema = schema

export type GroupAudioMessage = z.infer<typeof groupAudioMessageSchema>
