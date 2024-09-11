import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedVCardMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.vcard),
	contact: contactSchema,
})

export type GroupQuotedVCardMessage = z.infer<
	typeof groupQuotedVCardMessageSchema
>
