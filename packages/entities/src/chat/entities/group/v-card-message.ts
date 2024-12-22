import type { z } from 'zod'

import { baseGroupVCardMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupVCardMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupVCardMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupVCardMessageSchema: GroupVCardMessageSchema = schema

export type GroupVCardMessage = z.infer<typeof groupVCardMessageSchema>
