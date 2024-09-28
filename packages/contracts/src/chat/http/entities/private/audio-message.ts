import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateAudioMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.audio),
  media: messageMediaSchema.nullable(),
})

export const privateAudioMessageSchema = basePrivateAudioMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

export type PrivateAudioMessage = z.infer<typeof privateAudioMessageSchema>
