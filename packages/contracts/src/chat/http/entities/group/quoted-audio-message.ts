import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedAudioMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.audio),
	media: messageMediaSchema,
})

export type GroupQuotedAudioMessage = z.infer<
	typeof groupQuotedAudioMessageSchema
>
