import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { contactSchema } from '../contact'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedMultiVCardMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.multi_vcard),
	contacts: z.array(contactSchema),
})

export type PrivateQuotedMultiVCardMessage = z.infer<
	typeof privateQuotedMultiVCardMessageSchema
>

export const privateMultiVCardMessageSchema =
	privateQuotedMultiVCardMessageSchema.extend({
		quoted: privateQuotedMessageSchema.nullable(),
	})

export type PrivateMultiVCardMessage = z.infer<
	typeof privateMultiVCardMessageSchema
>
