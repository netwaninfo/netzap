import { z } from 'zod'

import { privateMessageSchema } from '@/chat/types/index.js'
import { baseChatSchema } from '../chat.js'

const schema = baseChatSchema.extend({
  contactId: z.string(),
  lastMessage: z.lazy(() => privateMessageSchema.nullable()),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface PrivateChatSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const privateChatSchema: PrivateChatSchema = schema

export type PrivateChat = z.infer<typeof privateChatSchema>
