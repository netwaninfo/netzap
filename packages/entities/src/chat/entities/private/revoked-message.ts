import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'

const schema = basePrivateMessage.extend({
  type: z.literal(messageTypeSchema.Values.revoked),
  revokedAt: z.date(),
  revokedBy: z.string().nullable(),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateRevokedMessageSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateRevokedMessageSchema: PrivateRevokedMessageSchema = schema

export type PrivateRevokedMessage = z.infer<typeof privateRevokedMessageSchema>
