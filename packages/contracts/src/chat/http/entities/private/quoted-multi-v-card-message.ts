import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { contactSchema } from '../contact.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedMultiVCardMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.multi_vcard),
	contacts: z.array(contactSchema),
})

export type PrivateQuotedMultiVCardMessage = z.infer<
	typeof privateQuotedMultiVCardMessageSchema
>
