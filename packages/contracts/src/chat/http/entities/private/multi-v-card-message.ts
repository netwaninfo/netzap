import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { basePrivateMessage } from './message.js'
import { privateQuotedMessageSchema } from './quoted.js'

export const basePrivateMultiVCardMessageSchema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.multi_vcard),
  contacts: z.array(contactSchema),
})

export const privateMultiVCardMessageSchema =
  basePrivateMultiVCardMessageSchema.extend({
    quoted: z.lazy(() => privateQuotedMessageSchema).nullable(),
  })

export type PrivateMultiVCardMessage = z.infer<
  typeof privateMultiVCardMessageSchema
>
