import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedTextMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.text),
	body: z.string(),
})

export type GroupQuotedTextMessage = z.infer<
	typeof groupQuotedTextMessageSchema
>

export const groupTextMessageSchema = groupQuotedTextMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupTextMessage = z.infer<typeof groupTextMessageSchema>
