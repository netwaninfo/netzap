import { z } from 'zod'

import { privateQuotedMessageSchema } from './quoted-message.js'
import { privateQuotedVideoMessageSchema } from './quoted-video-message.js'

export const privateVideoMessageSchema = privateQuotedVideoMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateVideoMessage = z.infer<typeof privateVideoMessageSchema>
