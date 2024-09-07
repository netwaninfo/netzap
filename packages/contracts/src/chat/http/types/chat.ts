import { z } from 'zod'

import { groupChatSchema, privateChatSchema } from '../entities'

export const chatSchema = z.union([privateChatSchema, groupChatSchema])

export type Chat = z.infer<typeof chatSchema>
