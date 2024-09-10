import { z } from 'zod'

import { groupQuotedAudioMessageSchema } from './quoted-audio-message.js'
import { groupQuotedDocumentMessageSchema } from './quoted-document-message.js'
import { groupQuotedImageMessageSchema } from './quoted-image-message.js'
import { groupQuotedMultiVCardMessageSchema } from './quoted-multi-v-card-message.js'
import { groupQuotedRevokedMessageSchema } from './quoted-revoked-message.js'
import { groupQuotedTextMessageSchema } from './quoted-text-message.js'
import { groupQuotedUnknownMessageSchema } from './quoted-unknown-message.js'
import { groupQuotedVCardMessageSchema } from './quoted-v-card-message.js'
import { groupQuotedVideoMessageSchema } from './quoted-video-message.js'
import { groupQuotedVoiceMessageSchema } from './quoted-voice-message.js'

export const groupQuotedMessageSchema = z.discriminatedUnion('type', [
	groupQuotedAudioMessageSchema,
	groupQuotedDocumentMessageSchema,
	groupQuotedImageMessageSchema,
	groupQuotedMultiVCardMessageSchema,
	groupQuotedRevokedMessageSchema,
	groupQuotedTextMessageSchema,
	groupQuotedUnknownMessageSchema,
	groupQuotedVCardMessageSchema,
	groupQuotedVideoMessageSchema,
	groupQuotedVoiceMessageSchema,
])

export type GroupQuotedMessage = z.infer<typeof groupQuotedMessageSchema>
