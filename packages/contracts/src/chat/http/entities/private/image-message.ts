import { z } from 'zod'

import { privateQuotedImageMessageSchema } from './quoted-image-message.js'
import { privateQuotedMessageSchema } from './quoted-message.js'

export const privateImageMessageSchema = privateQuotedImageMessageSchema.extend(
	{
		quoted: privateQuotedMessageSchema.nullable(),
	},
)

export type PrivateImageMessage = z.infer<typeof privateImageMessageSchema>
