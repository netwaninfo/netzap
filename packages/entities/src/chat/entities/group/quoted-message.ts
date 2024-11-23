import { z } from 'zod'

import { baseGroupAudioMessageSchema } from '../base/group/audio-message'
import { baseGroupDocumentMessageSchema } from '../base/group/document-message'
import { baseGroupImageMessageSchema } from '../base/group/image-message'
import { baseGroupMultiVCardMessageSchema } from '../base/group/multi-v-card-message'
import { baseGroupTextMessageSchema } from '../base/group/text-message'
import { baseGroupUnknownMessageSchema } from '../base/group/unknown-message'
import { baseGroupVCardMessageSchema } from '../base/group/v-card-message'
import { baseGroupVideoMessageSchema } from '../base/group/video-message'
import { baseGroupVoiceMessageSchema } from '../base/group/voice-message'

export const groupQuotedMessageSchema = z.discriminatedUnion('type', [
  baseGroupAudioMessageSchema,
  baseGroupDocumentMessageSchema,
  baseGroupImageMessageSchema,
  baseGroupMultiVCardMessageSchema,
  baseGroupTextMessageSchema,
  baseGroupUnknownMessageSchema,
  baseGroupVCardMessageSchema,
  baseGroupVideoMessageSchema,
  baseGroupVoiceMessageSchema,
])

export type GroupQuotedMessage = z.infer<typeof groupQuotedMessageSchema>
