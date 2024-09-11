import z from 'zod'

import { groupQuotedMessageSchema } from './quoted-message.js'
import { groupQuotedVoiceMessageSchema } from './quoted-voice-message.js'

export const groupVoiceMessageSchema = groupQuotedVoiceMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

export type GroupVoiceMessage = z.infer<typeof groupVoiceMessageSchema>
