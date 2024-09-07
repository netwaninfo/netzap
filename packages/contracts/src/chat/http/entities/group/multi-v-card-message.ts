import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { contactSchema } from '../contact'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedMultiVCardMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.multi_vcard),
	contacts: z.array(contactSchema),
})

export type GroupQuotedMultiVCardMessage = z.infer<
	typeof groupQuotedMultiVCardMessageSchema
>

export const groupMultiVCardMessageSchema =
	groupQuotedMultiVCardMessageSchema.extend({
		quoted: groupQuotedMessageSchema.nullable(),
	})

export type GroupMultiVCardMessage = z.infer<
	typeof groupMultiVCardMessageSchema
>
