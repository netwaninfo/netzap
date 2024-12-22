import type { z } from 'zod'

import { baseGroupAudioMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupAudioMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupAudioMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupAudioMessageSchema: GroupAudioMessageSchema = schema

export type GroupAudioMessage = z.infer<typeof groupAudioMessageSchema>
