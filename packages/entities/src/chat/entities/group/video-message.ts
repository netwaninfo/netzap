import type { z } from 'zod'

import { baseGroupVideoMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupVideoMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupVideoMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupVideoMessageSchema: GroupVideoMessageSchema = schema

export type GroupVideoMessage = z.infer<typeof groupVideoMessageSchema>
