import { z } from 'zod'

import { groupAudioMessageSchema } from './audio-message'
import { groupDocumentMessageSchema } from './document-message'
import { groupImageMessageSchema } from './image-message'
import { groupMultiVCardMessageSchema } from './multi-v-card-message'
import { groupRevokedMessageSchema } from './revoked-message'
import { groupTextMessageSchema } from './text-message'
import { groupUnknownMessageSchema } from './unknown-message'
import { groupVCardMessageSchema } from './v-card-message'
import { groupVideoMessageSchema } from './video-message'
import { groupVoiceMessageSchema } from './voice-message'

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
