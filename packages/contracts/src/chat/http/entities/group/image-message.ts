import { z } from 'zod'

import { groupQuotedImageMessageSchema } from './quoted-image-message.js'
import { groupQuotedMessageSchema } from './quoted-message.js'

export const groupImageMessageSchema = groupQuotedImageMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupImageMessage = z.infer<typeof groupImageMessageSchema>
