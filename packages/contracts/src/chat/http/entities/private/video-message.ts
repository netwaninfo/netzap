import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateVideoMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.video),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

export const privateVideoMessageSchema = basePrivateVideoMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

export type PrivateVideoMessage = z.infer<typeof privateVideoMessageSchema>
