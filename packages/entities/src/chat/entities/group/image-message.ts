import { z } from 'zod'

import { baseGroupImageMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupImageMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupImageMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupImageMessageSchema: GroupImageMessageSchema = schema

export type GroupImageMessage = z.infer<typeof groupImageMessageSchema>
