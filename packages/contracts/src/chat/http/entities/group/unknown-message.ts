import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedUnknownMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.unknown),
})

export type GroupQuotedUnknownMessage = z.infer<
	typeof groupQuotedUnknownMessageSchema
>

export const groupUnknownMessageSchema = groupQuotedUnknownMessageSchema.extend(
	{
		quoted: groupQuotedMessageSchema.nullable(),
	},
)

export type GroupUnknownMessage = z.infer<typeof groupUnknownMessageSchema>
