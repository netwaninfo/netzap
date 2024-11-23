import { z } from 'zod'

import { privateAudioMessageSchema } from './audio-message'
import { privateDocumentMessageSchema } from './document-message'
import { privateImageMessageSchema } from './image-message'
import { privateMultiVCardMessageSchema } from './multi-v-card-message'
import { privateRevokedMessageSchema } from './revoked-message'
import { privateTextMessageSchema } from './text-message'
import { privateUnknownMessageSchema } from './unknown-message'
import { privateVCardMessageSchema } from './v-card-message'
import { privateVideoMessageSchema } from './video-message'
import { privateVoiceMessageSchema } from './voice-message'

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
