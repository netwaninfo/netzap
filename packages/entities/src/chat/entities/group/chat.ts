import { z } from 'zod'

import { chatTypeSchema } from '@/chat/enums'
import { baseChatSchema } from '../base'
import { groupSchema } from '../group'
import { groupMessageSchema } from './message'

const schema = baseChatSchema.extend({
  group: groupSchema,
  type: z.literal(chatTypeSchema.Values.group),
  lastMessage: groupMessageSchema.nullable(),
})

// TS7056
export interface GroupChatSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const groupChatSchema: GroupChatSchema = schema

export type GroupChat = z.infer<typeof groupChatSchema>
