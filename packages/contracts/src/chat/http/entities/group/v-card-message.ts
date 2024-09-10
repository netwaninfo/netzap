import { z } from 'zod'

import { groupQuotedMessageSchema } from './quoted-message.js'
import { groupQuotedVCardMessageSchema } from './quoted-v-card-message.js'

export const groupVCardMessageSchema = groupQuotedVCardMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupVCardMessage = z.infer<typeof groupVCardMessageSchema>
