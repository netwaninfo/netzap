import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedImageMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.image),
	media: MessageMediaSchema,
	body: z.string().nullable(),
})

export type PrivateQuotedImageMessage = z.infer<
	typeof privateQuotedImageMessageSchema
>

export const privateImageMessageSchema = privateQuotedImageMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateImageMessage = z.infer<typeof privateImageMessageSchema>
