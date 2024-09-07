import { z } from 'zod'

import { groupMessageSchema } from '../../types'
import { baseChatSchema } from '../chat'

export const groupChatSchema = baseChatSchema.extend({
	groupId: z.string(),
	lastMessage: groupMessageSchema.nullable(),
})

export type GroupChat = z.infer<typeof groupChatSchema>
