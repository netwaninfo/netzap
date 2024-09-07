import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedVoiceMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.voice),
	media: MessageMediaSchema,
})

export type PrivateQuotedVoiceMessage = z.infer<
	typeof privateQuotedVoiceMessageSchema
>

export const privateVoiceMessageSchema = privateQuotedVoiceMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateVoiceMessage = z.infer<typeof privateVoiceMessageSchema>
