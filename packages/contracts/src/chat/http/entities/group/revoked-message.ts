import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'

export const groupRevokedMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.revoked),
  revokedAt: z.date(),
  revokedBy: z.string().nullable(),
})

export type GroupRevokedMessage = z.infer<typeof groupRevokedMessageSchema>
