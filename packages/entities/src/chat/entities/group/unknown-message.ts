import type { z } from 'zod'

import { baseGroupUnknownMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupUnknownMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupUnknownMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupUnknownMessageSchema: GroupUnknownMessageSchema = schema

export type GroupUnknownMessage = z.infer<typeof groupUnknownMessageSchema>
