import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { contactSchema } from '../contact'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedVCardMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.vcard),
	contact: contactSchema,
})

export type GroupQuotedVCardMessage = z.infer<
	typeof groupQuotedVCardMessageSchema
>

export const groupVCardMessageSchema = groupQuotedVCardMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupVCardMessage = z.infer<typeof groupVCardMessageSchema>
