import { z } from 'zod'

import { baseGroupAudioMessageSchema } from './audio-message.js'
import { baseGroupDocumentMessageSchema } from './document-message.js'
import { baseGroupImageMessageSchema } from './image-message.js'
import { baseGroupMultiVCardMessageSchema } from './multi-v-card-message.js'
import { baseGroupTextMessageSchema } from './text-message.js'
import { baseGroupUnknownMessageSchema } from './unknown-message.js'
import { baseGroupVCardMessageSchema } from './v-card-message.js'
import { baseGroupVideoMessageSchema } from './video-message.js'
import { baseGroupVoiceMessageSchema } from './voice-message.js'

const schema = z.union([
  z.lazy(() => baseGroupAudioMessageSchema),
  z.lazy(() => baseGroupDocumentMessageSchema),
  z.lazy(() => baseGroupImageMessageSchema),
  z.lazy(() => baseGroupMultiVCardMessageSchema),
  z.lazy(() => baseGroupTextMessageSchema),
  z.lazy(() => baseGroupUnknownMessageSchema),
  z.lazy(() => baseGroupVCardMessageSchema),
  z.lazy(() => baseGroupVideoMessageSchema),
  z.lazy(() => baseGroupVoiceMessageSchema),
])

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupQuotedMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupQuotedMessageSchema: GroupQuotedMessageSchema = schema

export type GroupQuotedMessage = z.infer<typeof groupQuotedMessageSchema>
