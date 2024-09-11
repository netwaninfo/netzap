import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedVoiceMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.voice),
	media: messageMediaSchema,
})

export type GroupQuotedVoiceMessage = z.infer<
	typeof groupQuotedVoiceMessageSchema
>
