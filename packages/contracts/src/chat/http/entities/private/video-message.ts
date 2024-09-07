import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../message-media'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedVideoMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.video),
	media: MessageMediaSchema,
	body: z.string().nullable(),
})

export type PrivateQuotedVideoMessage = z.infer<
	typeof privateQuotedVideoMessageSchema
>

export const privateVideoMessageSchema = privateQuotedVideoMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateVideoMessage = z.infer<typeof privateVideoMessageSchema>
