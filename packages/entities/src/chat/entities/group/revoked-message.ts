import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'

const schema = baseGroupMessage.extend({
  type: z.literal(messageTypeSchema.Values.revoked),
  revokedAt: z.date(),
  revokedBy: z.string().nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupRevokedMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupRevokedMessageSchema: GroupRevokedMessageSchema = schema

export type GroupRevokedMessage = z.infer<typeof groupRevokedMessageSchema>
