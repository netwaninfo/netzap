import { z } from 'zod'

import { groupQuotedMessageSchema } from './quoted-message.js'
import { groupQuotedUnknownMessageSchema } from './quoted-unknown-message.js'

export const groupUnknownMessageSchema = groupQuotedUnknownMessageSchema.extend(
	{
		quoted: groupQuotedMessageSchema.nullable(),
	},
)

export type GroupUnknownMessage = z.infer<typeof groupUnknownMessageSchema>
