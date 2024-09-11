import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedImageMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.image),
  media: messageMediaSchema,
  body: z.string().nullable(),
})

export type GroupQuotedImageMessage = z.infer<
  typeof groupQuotedImageMessageSchema
>
