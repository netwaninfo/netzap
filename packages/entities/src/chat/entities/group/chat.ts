import { z } from 'zod'

import { groupMessageSchema } from '@/chat/types/index.js'
import { baseChatSchema } from '../chat.js'

const schema = baseChatSchema.extend({
  groupId: z.string(),
  lastMessage: z.lazy(() => groupMessageSchema.nullable()),
})

// TS7056
type SchemaInput = z.input<typeof schema>
type SchemaOutput = z.output<typeof schema>

export interface GroupChatSchema
  extends z.ZodType<SchemaOutput, z.ZodTypeDef, SchemaInput> {}
// ------

export const groupChatSchema: GroupChatSchema = schema

export type GroupChat = z.infer<typeof groupChatSchema>
