import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateTextMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.text),
  body: z.string(),
})

export const privateTextMessageSchema = basePrivateTextMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

export type PrivateTextMessage = z.infer<typeof privateTextMessageSchema>
