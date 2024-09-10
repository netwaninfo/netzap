import { z } from 'zod'

import { privateQuotedMessageSchema } from './quoted-message.js'
import { privateQuotedMultiVCardMessageSchema } from './quoted-multi-v-card-message.js'

export const privateMultiVCardMessageSchema =
	privateQuotedMultiVCardMessageSchema.extend({
		quoted: privateQuotedMessageSchema.nullable(),
	})

export type PrivateMultiVCardMessage = z.infer<
	typeof privateMultiVCardMessageSchema
>
