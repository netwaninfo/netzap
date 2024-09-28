import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupUnknownMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.unknown),
})

export const groupUnknownMessageSchema = baseGroupUnknownMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

export type GroupUnknownMessage = z.infer<typeof groupUnknownMessageSchema>
