import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedTextMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.text),
	body: z.string(),
})

export type PrivateQuotedTextMessage = z.infer<
	typeof privateQuotedTextMessageSchema
>

export const privateTextMessageSchema = privateQuotedTextMessageSchema.extend({
	quoted: privateQuotedMessageSchema.nullable(),
})

export type PrivateTextMessage = z.infer<typeof privateTextMessageSchema>
