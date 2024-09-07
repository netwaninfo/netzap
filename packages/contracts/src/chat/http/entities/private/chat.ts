import { z } from 'zod'

import { privateMessageSchema } from '../../types'
import { baseChatSchema } from '../chat'

export const privateChatSchema = baseChatSchema.extend({
	contactId: z.string(),
	lastMessage: privateMessageSchema.nullable(),
})

export type PrivateChat = z.infer<typeof privateChatSchema>
