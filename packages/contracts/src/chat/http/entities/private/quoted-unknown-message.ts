import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedUnknownMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.unknown),
})

export type PrivateQuotedUnknownMessage = z.infer<
	typeof privateQuotedUnknownMessageSchema
>
