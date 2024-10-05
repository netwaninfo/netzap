import { z } from 'zod'

import { basePrivateAudioMessageSchema } from './audio-message.js'
import { basePrivateDocumentMessageSchema } from './document-message.js'
import { basePrivateImageMessageSchema } from './image-message.js'
import { basePrivateMultiVCardMessageSchema } from './multi-v-card-message.js'
import { basePrivateTextMessageSchema } from './text-message.js'
import { basePrivateUnknownMessageSchema } from './unknown-message.js'
import { basePrivateVCardMessageSchema } from './v-card-message.js'
import { basePrivateVideoMessageSchema } from './video-message.js'
import { basePrivateVoiceMessageSchema } from './voice-message.js'

const schema = z.union([
  z.lazy(() => basePrivateAudioMessageSchema),
  z.lazy(() => basePrivateDocumentMessageSchema),
  z.lazy(() => basePrivateImageMessageSchema),
  z.lazy(() => basePrivateMultiVCardMessageSchema),
  z.lazy(() => basePrivateTextMessageSchema),
  z.lazy(() => basePrivateUnknownMessageSchema),
  z.lazy(() => basePrivateVCardMessageSchema),
  z.lazy(() => basePrivateVideoMessageSchema),
  z.lazy(() => basePrivateVoiceMessageSchema),
])

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateQuotedMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateQuotedMessageSchema: PrivateQuotedMessageSchema = schema

export type PrivateQuotedMessage = z.infer<typeof privateQuotedMessageSchema>