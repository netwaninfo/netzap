import { z } from 'zod'

import { groupQuotedAudioMessageSchema } from './audio-message'
import { groupQuotedDocumentMessageSchema } from './document-message'
import { groupQuotedImageMessageSchema } from './image-message'
import { groupQuotedMultiVCardMessageSchema } from './multi-v-card-message'
import { groupQuotedRevokedMessageSchema } from './revoked-message'
import { groupQuotedTextMessageSchema } from './text-message'
import { groupQuotedUnknownMessageSchema } from './unknown-message'
import { groupQuotedVCardMessageSchema } from './v-card-message'
import { groupQuotedVideoMessageSchema } from './video-message'
import { groupQuotedVoiceMessageSchema } from './voice-message'

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
