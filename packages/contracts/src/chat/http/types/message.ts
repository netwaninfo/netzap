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

export type PrivateMessageSchema = z.infer<typeof privateMessageSchema>

export const messageSchema = privateMessageSchema

export type Message = z.infer<typeof messageSchema>
