import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedTextMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.text),
  body: z.string(),
})

export type PrivateQuotedTextMessage = z.infer<
  typeof privateQuotedTextMessageSchema
>
