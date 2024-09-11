import z from 'zod'

import { messageStatusSchema } from '@/chat/enums/index.js'

export const baseMessageSchema = z.object({
	id: z.string(),
	waMessageId: z.string(),
	waChatId: z.string(),
	instanceId: z.string(),
	chatId: z.string(),
	status: messageStatusSchema,
	isForwarded: z.boolean(),
	isFromMe: z.boolean(),
	createdAt: z.date(),
	sentBy: z.string().nullable(),
})
