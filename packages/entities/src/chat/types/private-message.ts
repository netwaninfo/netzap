import { z } from 'zod'
import {
  privateAudioMessageSchema,
  privateDocumentMessageSchema,
  privateImageMessageSchema,
  privateMultiVCardMessageSchema,
  privateRevokedMessageSchema,
  privateTextMessageSchema,
  privateUnknownMessageSchema,
  privateVCardMessageSchema,
  privateVideoMessageSchema,
  privateVoiceMessageSchema,
} from '../entities/index.js'

const schema = z.union([
  privateAudioMessageSchema,
  privateDocumentMessageSchema,
  privateImageMessageSchema,
  privateMultiVCardMessageSchema,
  privateRevokedMessageSchema,
  privateTextMessageSchema,
  privateUnknownMessageSchema,
  privateVCardMessageSchema,
  privateVideoMessageSchema,
  privateVoiceMessageSchema,
])

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateMessageSchema: PrivateMessageSchema = schema

export type PrivateMessage = z.infer<typeof privateMessageSchema>
