import { z } from 'zod'

import { groupQuotedMessageSchema } from './quoted-message.js'
import { groupQuotedTextMessageSchema } from './quoted-text-message.js'

export const groupTextMessageSchema = groupQuotedTextMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupTextMessage = z.infer<typeof groupTextMessageSchema>
