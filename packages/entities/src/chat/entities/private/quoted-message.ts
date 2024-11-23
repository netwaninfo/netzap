import { z } from 'zod'

import { basePrivateAudioMessageSchema } from '../base/private/audio-message'
import { basePrivateDocumentMessageSchema } from '../base/private/document-message'
import { basePrivateImageMessageSchema } from '../base/private/image-message'
import { basePrivateMultiVCardMessageSchema } from '../base/private/multi-v-card-message'
import { basePrivateTextMessageSchema } from '../base/private/text-message'
import { basePrivateUnknownMessageSchema } from '../base/private/unknown-message'
import { basePrivateVCardMessageSchema } from '../base/private/v-card-message'
import { basePrivateVideoMessageSchema } from '../base/private/video-message'
import { basePrivateVoiceMessageSchema } from '../base/private/voice-message'

export const privateQuotedMessageSchema = z.discriminatedUnion('type', [
  basePrivateAudioMessageSchema,
  basePrivateDocumentMessageSchema,
  basePrivateImageMessageSchema,
  basePrivateMultiVCardMessageSchema,
  basePrivateTextMessageSchema,
  basePrivateUnknownMessageSchema,
  basePrivateVCardMessageSchema,
  basePrivateVideoMessageSchema,
  basePrivateVoiceMessageSchema,
])

export type PrivateQuotedMessage = z.infer<typeof privateQuotedMessageSchema>
