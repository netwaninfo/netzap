import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupVCardMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.vcard),
  contact: contactSchema,
})

export const groupVCardMessageSchema = baseGroupVCardMessageSchema.extend({
  quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
})

export type GroupVCardMessage = z.infer<typeof groupVCardMessageSchema>
