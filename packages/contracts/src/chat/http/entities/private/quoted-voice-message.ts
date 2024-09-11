import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedVoiceMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.voice),
	media: messageMediaSchema,
})

export type PrivateQuotedVoiceMessage = z.infer<
	typeof privateQuotedVoiceMessageSchema
>
