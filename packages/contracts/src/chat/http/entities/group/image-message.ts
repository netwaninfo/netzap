import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupImageMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.image),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

export const groupImageMessageSchema = baseGroupImageMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

export type GroupImageMessage = z.infer<typeof groupImageMessageSchema>
