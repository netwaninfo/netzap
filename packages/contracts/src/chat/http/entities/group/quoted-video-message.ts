import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedVideoMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.video),
	media: messageMediaSchema,
	body: z.string().nullable(),
})

export type GroupQuotedVideoMessage = z.infer<
	typeof groupQuotedVideoMessageSchema
>
