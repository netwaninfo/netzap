import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupDocumentMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.document),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

export const groupDocumentMessageSchema = baseGroupDocumentMessageSchema.extend(
  {
    quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
  }
)

export type GroupDocumentMessage = z.infer<typeof groupDocumentMessageSchema>
