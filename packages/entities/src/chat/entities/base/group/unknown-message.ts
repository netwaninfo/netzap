import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { baseGroupMessageSchema } from './message'

const schema = baseGroupMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.unknown),
})

// TS7056
export interface BaseGroupUnknownMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const baseGroupUnknownMessageSchema: BaseGroupUnknownMessageSchema =
  schema
