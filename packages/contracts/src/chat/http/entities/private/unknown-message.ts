import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateUnknownMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.unknown),
})

export const privateUnknownMessageSchema =
  basePrivateUnknownMessageSchema.extend({
    quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
  })

export type PrivateUnknownMessage = z.infer<typeof privateUnknownMessageSchema>
