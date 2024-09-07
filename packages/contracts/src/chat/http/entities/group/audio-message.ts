import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedAudioMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.audio),
	media: MessageMediaSchema,
})

export type GroupQuotedAudioMessage = z.infer<
	typeof groupQuotedAudioMessageSchema
>

export const groupAudioMessageSchema = groupQuotedAudioMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupAudioMessage = z.infer<typeof groupAudioMessageSchema>
