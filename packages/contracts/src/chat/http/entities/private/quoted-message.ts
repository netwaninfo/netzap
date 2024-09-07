import { z } from 'zod'

import { privateQuotedAudioMessageSchema } from './audio-message'
import { privateQuotedDocumentMessageSchema } from './document-message'
import { privateQuotedImageMessageSchema } from './image-message'
import { privateQuotedMultiVCardMessageSchema } from './multi-v-card-message'
import { privateQuotedRevokedMessageSchema } from './revoked-message'
import { privateQuotedTextMessageSchema } from './text-message'
import { privateQuotedUnknownMessageSchema } from './unknown-message'
import { privateQuotedVCardMessageSchema } from './v-card-message'
import { privateQuotedVideoMessageSchema } from './video-message'
import { privateQuotedVoiceMessageSchema } from './voice-message'

export const privateQuotedMessageSchema = z.discriminatedUnion('type', [
	privateQuotedAudioMessageSchema,
	privateQuotedDocumentMessageSchema,
	privateQuotedImageMessageSchema,
	privateQuotedMultiVCardMessageSchema,
	privateQuotedRevokedMessageSchema,
	privateQuotedTextMessageSchema,
	privateQuotedUnknownMessageSchema,
	privateQuotedVCardMessageSchema,
	privateQuotedVideoMessageSchema,
	privateQuotedVoiceMessageSchema,
])

export type PrivateQuotedMessage = z.infer<typeof privateQuotedMessageSchema>
