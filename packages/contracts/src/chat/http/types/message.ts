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
} from '../entities'

export const privateMessageSchema = z.discriminatedUnion('type', [
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

export const groupMessageSchema = z.discriminatedUnion('type', [
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
