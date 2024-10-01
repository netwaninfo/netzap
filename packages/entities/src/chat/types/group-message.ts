import { z } from 'zod'

import {
  groupAudioMessageSchema,
  groupDocumentMessageSchema,
  groupImageMessageSchema,
  groupMultiVCardMessageSchema,
  groupRevokedMessageSchema,
  groupTextMessageSchema,
  groupUnknownMessageSchema,
  groupVCardMessageSchema,
  groupVideoMessageSchema,
  groupVoiceMessageSchema,
} from '../entities/index.js'

const schema = z.union([
  groupAudioMessageSchema,
  groupDocumentMessageSchema,
  groupImageMessageSchema,
  groupMultiVCardMessageSchema,
  groupRevokedMessageSchema,
  groupTextMessageSchema,
  groupUnknownMessageSchema,
  groupVCardMessageSchema,
  groupVideoMessageSchema,
  groupVoiceMessageSchema,
])

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupMessageSchema: GroupMessageSchema = schema

export type GroupMessage = z.infer<typeof groupMessageSchema>
