import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupTextMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.text),
  body: z.string(),
})

export const groupTextMessageSchema = baseGroupTextMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

export type GroupTextMessage = z.infer<typeof groupTextMessageSchema>
