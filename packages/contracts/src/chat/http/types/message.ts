import z from 'zod'

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

export const privateMessageSchema = z.union([
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

export type PrivateMessage = z.infer<typeof privateMessageSchema>

export const groupMessageSchema = z.union([
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

export type GroupMessage = z.infer<typeof groupMessageSchema>

export const messageSchema = z.union([privateMessageSchema, groupMessageSchema])

export type Message = z.infer<typeof messageSchema>
