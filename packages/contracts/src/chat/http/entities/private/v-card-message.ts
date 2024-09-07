import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { contactSchema } from '../contact'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedVCardMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.vcard),
	contact: contactSchema,
})

export type PrivateQuotedVCardMessage = z.infer<
	typeof privateQuotedVCardMessageSchema
>

export const privateVCardMessageSchema = privateQuotedVCardMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateVCardMessage = z.infer<typeof privateVCardMessageSchema>
