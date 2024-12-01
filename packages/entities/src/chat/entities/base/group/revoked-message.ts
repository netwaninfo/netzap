import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { baseGroupMessageSchema } from './message'

const schema = baseGroupMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.revoked),
  revokedAt: z.coerce.date(),
  revokedBy: z.string().nullable(),
})

// TS7056
export interface BaseGroupRevokedMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const baseGroupRevokedMessageSchema: BaseGroupRevokedMessageSchema =
  schema
