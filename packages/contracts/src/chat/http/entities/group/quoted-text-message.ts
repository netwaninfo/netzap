import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedTextMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.text),
	body: z.string(),
})

export type GroupQuotedTextMessage = z.infer<
	typeof groupQuotedTextMessageSchema
>
