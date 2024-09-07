import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { basePrivateMessage } from './message'

export const privateQuotedRevokedMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.revoked),
	revokedAt: z.date(),
	revokedBy: z.string().nullable(),
})

export type PrivateQuotedRevokedMessage = z.infer<
	typeof privateQuotedRevokedMessageSchema
>

export const privateRevokedMessageSchema =
	privateQuotedRevokedMessageSchema.extend({
		quoted: z.null(),
	})

export type PrivateRevokedMessage = z.infer<typeof privateRevokedMessageSchema>
