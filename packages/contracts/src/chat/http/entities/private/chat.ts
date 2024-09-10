import { z } from 'zod'

import { privateMessageSchema } from '../../types/index.js'
import { baseChatSchema } from '../chat.js'

export const privateChatSchema = baseChatSchema.extend({
	contactId: z.string(),
	lastMessage: privateMessageSchema.nullable(),
})

export type PrivateChat = z.infer<typeof privateChatSchema>
