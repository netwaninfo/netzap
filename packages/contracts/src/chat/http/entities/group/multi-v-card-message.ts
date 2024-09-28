import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { baseGroupMessage } from './message.js'
import { groupQuotedMessageSchema } from './quoted.js'

export const baseGroupMultiVCardMessageSchema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.multi_vcard),
  contacts: z.array(contactSchema),
})

export const groupMultiVCardMessageSchema =
  baseGroupMultiVCardMessageSchema.extend({
    quoted: z.lazy(() => groupQuotedMessageSchema).nullable(),
  })

export type GroupMultiVCardMessage = z.infer<
  typeof groupMultiVCardMessageSchema
>
