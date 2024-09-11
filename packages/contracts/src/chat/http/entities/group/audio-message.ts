import z from 'zod'

import { groupQuotedAudioMessageSchema } from './quoted-audio-message.js'
import { groupQuotedMessageSchema } from './quoted-message.js'

export const groupAudioMessageSchema = groupQuotedAudioMessageSchema.extend({
	quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupAudioMessage = z.infer<typeof groupAudioMessageSchema>
