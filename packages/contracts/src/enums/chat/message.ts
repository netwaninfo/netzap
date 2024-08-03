import { z } from 'zod'

export const messageType = z.enum([
	'text',
	'audio',
	'voice',
	'image',
	'video',
	'document',
	// 'sticker',
	'vcard',
	'multi_vcard',
	'revoked',
	'unknown',
])

export type MessageType = z.infer<typeof messageType>

export const messageStatus = z.enum([
	'error',
	'pending',
	'sent',
	'read',
	'played',
])

export type MessageStatus = z.infer<typeof messageStatus>
