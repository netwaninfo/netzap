import { z } from 'zod'

import { privateQuotedMessageSchema } from './quoted-message.js'
import { privateQuotedVoiceMessageSchema } from './quoted-voice-message.js'

export const privateVoiceMessageSchema = privateQuotedVoiceMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateVoiceMessage = z.infer<typeof privateVoiceMessageSchema>
