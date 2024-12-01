import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { basePrivateMessageSchema } from './message'

const schema = basePrivateMessageSchema.extend({
  type: z.literal(messageTypeSchema.Values.revoked),
  revokedAt: z.coerce.date(),
  revokedBy: z.string().nullable(),
})

// TS7056
export interface BasePrivateRevokedMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const basePrivateRevokedMessageSchema: BasePrivateRevokedMessageSchema =
  schema
