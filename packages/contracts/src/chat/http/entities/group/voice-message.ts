import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedVoiceMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.voice),
	media: MessageMediaSchema,
})

export type GroupQuotedVoiceMessage = z.infer<
	typeof groupQuotedVoiceMessageSchema
>

export const groupVoiceMessageSchema = groupQuotedVoiceMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupVoiceMessage = z.infer<typeof groupVoiceMessageSchema>
