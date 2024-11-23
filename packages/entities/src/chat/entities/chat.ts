import { z } from 'zod'

import { groupChatSchema } from './group'
import { privateChatSchema } from './private'

export const chatSchema = z.discriminatedUnion('type', [
  privateChatSchema,
  groupChatSchema,
])

export type Chat = z.infer<typeof chatSchema>
