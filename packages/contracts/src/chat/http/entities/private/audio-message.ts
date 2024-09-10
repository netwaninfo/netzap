import { z } from 'zod'

import { privateQuotedAudioMessageSchema } from './quoted-audio-message.js'
import { privateQuotedMessageSchema } from './quoted-message.js'

export const privateAudioMessageSchema = privateQuotedAudioMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateAudioMessage = z.infer<typeof privateAudioMessageSchema>
