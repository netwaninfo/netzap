import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { messageMediaSchema } from '../../message-media'
import { baseGroupMessageSchema } from './message'

const schema = baseGroupMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.video),
  media: messageMediaSchema.nullable(),
  body: z.string().nullable(),
})

// TS7056
export interface BaseGroupVideoMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const baseGroupVideoMessageSchema: BaseGroupVideoMessageSchema = schema
