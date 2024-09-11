import z from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedRevokedMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.revoked),
	revokedAt: z.date(),
	revokedBy: z.string().nullable(),
})

export type PrivateQuotedRevokedMessage = z.infer<
	typeof privateQuotedRevokedMessageSchema
>
