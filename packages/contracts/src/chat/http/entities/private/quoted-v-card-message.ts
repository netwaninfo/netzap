import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedVCardMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.vcard),
	contact: contactSchema,
})

export type PrivateQuotedVCardMessage = z.infer<
	typeof privateQuotedVCardMessageSchema
>
