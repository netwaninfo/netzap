import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateVCardMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.vcard),
  contact: contactSchema,
})

export const privateVCardMessageSchema = basePrivateVCardMessageSchema.extend({
  quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
})

export type PrivateVCardMessage = z.infer<typeof privateVCardMessageSchema>
