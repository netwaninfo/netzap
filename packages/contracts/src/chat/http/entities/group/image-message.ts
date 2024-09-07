import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../message-media'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedImageMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.image),
	media: MessageMediaSchema,
	body: z.string().nullable(),
})

export type GroupQuotedImageMessage = z.infer<
	typeof groupQuotedImageMessageSchema
>

export const groupImageMessageSchema = groupQuotedImageMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupImageMessage = z.infer<typeof groupImageMessageSchema>
