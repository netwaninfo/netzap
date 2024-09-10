import { z } from 'zod'

import { privateQuotedAudioMessageSchema } from './quoted-audio-message.js'
import { privateQuotedDocumentMessageSchema } from './quoted-document-message.js'
import { privateQuotedImageMessageSchema } from './quoted-image-message.js'
import { privateQuotedMultiVCardMessageSchema } from './quoted-multi-v-card-message.js'
import { privateQuotedRevokedMessageSchema } from './quoted-revoked-message.js'
import { privateQuotedTextMessageSchema } from './quoted-text-message.js'
import { privateQuotedUnknownMessageSchema } from './quoted-unknown-message.js'
import { privateQuotedVCardMessageSchema } from './quoted-v-card-message.js'
import { privateQuotedVideoMessageSchema } from './quoted-video-message.js'
import { privateQuotedVoiceMessageSchema } from './quoted-voice-message.js'

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
