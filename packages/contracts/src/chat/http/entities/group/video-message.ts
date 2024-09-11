import z from 'zod'

import { groupQuotedMessageSchema } from './quoted-message.js'
import { groupQuotedVideoMessageSchema } from './quoted-video-message.js'

export const groupVideoMessageSchema = groupQuotedVideoMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupVideoMessage = z.infer<typeof groupVideoMessageSchema>
