import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedUnknownMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.unknown),
})

export type GroupQuotedUnknownMessage = z.infer<
	typeof groupQuotedUnknownMessageSchema
>
