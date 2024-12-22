import type { z } from 'zod'

import { baseGroupVoiceMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupVoiceMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupVoiceMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupVoiceMessageSchema: GroupVoiceMessageSchema = schema

export type GroupVoiceMessage = z.infer<typeof groupVoiceMessageSchema>
