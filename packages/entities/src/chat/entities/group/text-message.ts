import { z } from 'zod'

import { baseGroupTextMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupTextMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupTextMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupTextMessageSchema: GroupTextMessageSchema = schema

export type GroupTextMessage = z.infer<typeof groupTextMessageSchema>
