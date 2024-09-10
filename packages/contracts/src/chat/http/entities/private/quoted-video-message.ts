import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedVideoMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.video),
	media: messageMediaSchema,
	body: z.string().nullable(),
})

export type PrivateQuotedVideoMessage = z.infer<
	typeof privateQuotedVideoMessageSchema
>
