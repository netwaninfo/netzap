import z from 'zod'

import { privateQuotedMessageSchema } from './quoted-message.js'
import { privateQuotedUnknownMessageSchema } from './quoted-unknown-message.js'

export const privateUnknownMessageSchema =
	privateQuotedUnknownMessageSchema.extend({
		quoted: privateQuotedMessageSchema.nullable(),
	})

export type PrivateUnknownMessage = z.infer<typeof privateUnknownMessageSchema>
