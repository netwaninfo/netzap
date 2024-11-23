import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { basePrivateMessageSchema } from './message'

const schema = basePrivateMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.unknown),
})

// TS7056
export interface BasePrivateUnknownMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const basePrivateUnknownMessageSchema: BasePrivateUnknownMessageSchema =
  schema
