import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedUnknownMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.unknown),
})

export type PrivateQuotedUnknownMessage = z.infer<
	typeof privateQuotedUnknownMessageSchema
>

export const privateUnknownMessageSchema =
	privateQuotedUnknownMessageSchema.extend({
		quoted: privateQuotedMessageSchema.nullable(),
	})

export type PrivateUnknownMessage = z.infer<typeof privateUnknownMessageSchema>
