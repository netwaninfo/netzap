import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { basePrivateMessageSchema } from './message'

const schema = basePrivateMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.text),
  body: z.string(),
})

// TS7056
export interface BasePrivateTextMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const basePrivateTextMessageSchema: BasePrivateTextMessageSchema = schema
