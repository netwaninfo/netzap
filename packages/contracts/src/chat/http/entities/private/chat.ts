import { z } from 'zod'

import { baseChatSchema } from '../chat'

export const privateChatSchema = baseChatSchema.extend({
	contactId: z.string(),
	lastMessage: z.null(),
})

export type PrivateChat = z.infer<typeof privateChatSchema>
