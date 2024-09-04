import { z } from 'zod'

const baseChat = z.object({
	id: z.string(),
	waChatId: z.string(),
	instanceId: z.string(),
	unreadCount: z.number(),
})

// Private
export const chatHttpPrivateChatSchema = baseChat.extend({
	contactId: z.string(),
	lastMessage: z.null(),
})

export type ChatHttpPrivateChat = z.infer<typeof chatHttpPrivateChatSchema>

// Group
export const chatHttpGroupChatSchema = baseChat.extend({
	groupId: z.string(),
	lastMessage: z.null(),
})

export type ChatHttpGroupChat = z.infer<typeof chatHttpGroupChatSchema>

// Chat type
export const chatHttpChatSchema = z.union([
	chatHttpPrivateChatSchema,
	chatHttpGroupChatSchema,
])

export type ChatHttpChat = z.infer<typeof chatHttpChatSchema>
