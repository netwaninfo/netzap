import type { z } from 'zod'

import { baseGroupMultiVCardMessageSchema } from '../base/group'
import { groupQuotedMessageSchema } from './quoted-message'

const schema = baseGroupMultiVCardMessageSchema.extend({
  quoted: groupQuotedMessageSchema.nullable(),
})

// TS7056
export interface GroupMultiVCardMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupMultiVCardMessageSchema: GroupMultiVCardMessageSchema = schema

export type GroupMultiVCardMessage = z.infer<
  typeof groupMultiVCardMessageSchema
>
