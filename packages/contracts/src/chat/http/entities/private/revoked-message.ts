import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'

export const privateRevokedMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.revoked),
  revokedAt: z.date(),
  revokedBy: z.string().nullable(),
})

export type PrivateRevokedMessage = z.infer<typeof privateRevokedMessageSchema>
