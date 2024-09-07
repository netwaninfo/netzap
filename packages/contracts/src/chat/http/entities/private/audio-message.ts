import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../message-media'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedAudioMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.audio),
	media: MessageMediaSchema,
})

export type PrivateQuotedAudioMessage = z.infer<
	typeof privateQuotedAudioMessageSchema
>

export const privateAudioMessageSchema = privateQuotedAudioMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateAudioMessage = z.infer<typeof privateAudioMessageSchema>
