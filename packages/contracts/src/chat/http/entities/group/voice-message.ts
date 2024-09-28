import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupVoiceMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.voice),
  media: messageMediaSchema.nullable(),
})

export const groupVoiceMessageSchema = baseGroupVoiceMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

export type GroupVoiceMessage = z.infer<typeof groupVoiceMessageSchema>
