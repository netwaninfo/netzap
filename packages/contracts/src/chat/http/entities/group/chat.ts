import z from 'zod'

import { groupMessageSchema } from '../../types/index.js'
import { baseChatSchema } from '../chat.js'

export const groupChatSchema = baseChatSchema.extend({
	groupId: z.string(),
	lastMessage: groupMessageSchema.nullable(),
})

export type GroupChat = z.infer<typeof groupChatSchema>
