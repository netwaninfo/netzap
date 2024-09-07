import { z } from 'zod'

import { baseChatSchema } from '../chat'

export const groupChatSchema = baseChatSchema.extend({
	groupId: z.string(),
	lastMessage: z.null(),
})

export type GroupChat = z.infer<typeof groupChatSchema>
