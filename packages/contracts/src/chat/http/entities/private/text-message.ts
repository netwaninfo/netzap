import { z } from 'zod'

import { privateQuotedMessageSchema } from './quoted-message.js'
import { privateQuotedTextMessageSchema } from './quoted-text-message.js'

export const privateTextMessageSchema = privateQuotedTextMessageSchema.extend({
	quoted: privateQuotedMessageSchema.nullable(),
})

export type PrivateTextMessage = z.infer<typeof privateTextMessageSchema>
