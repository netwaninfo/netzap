import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedImageMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.image),
  media: messageMediaSchema,
  body: z.string().nullable(),
})

export type PrivateQuotedImageMessage = z.infer<
  typeof privateQuotedImageMessageSchema
>
