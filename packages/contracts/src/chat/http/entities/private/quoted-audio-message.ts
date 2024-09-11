import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedAudioMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.audio),
	media: messageMediaSchema,
})

export type PrivateQuotedAudioMessage = z.infer<
	typeof privateQuotedAudioMessageSchema
>
