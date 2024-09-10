import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedMultiVCardMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.multi_vcard),
	contacts: z.array(contactSchema),
})

export type GroupQuotedMultiVCardMessage = z.infer<
	typeof groupQuotedMultiVCardMessageSchema
>
