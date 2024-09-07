import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedVideoMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.video),
	media: MessageMediaSchema,
	body: z.string().nullable(),
})

export type GroupQuotedVideoMessage = z.infer<
	typeof groupQuotedVideoMessageSchema
>

export const groupVideoMessageSchema = groupQuotedVideoMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupVideoMessage = z.infer<typeof groupVideoMessageSchema>
