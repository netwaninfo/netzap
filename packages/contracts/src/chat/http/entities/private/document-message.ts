import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateDocumentMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.document),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

export const privateDocumentMessageSchema =
  basePrivateDocumentMessageSchema.extend({
    quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
  })

export type PrivateDocumentMessage = z.infer<
  typeof privateDocumentMessageSchema
>
