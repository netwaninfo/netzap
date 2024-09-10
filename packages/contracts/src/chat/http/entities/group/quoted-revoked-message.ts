import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedRevokedMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.revoked),
	revokedAt: z.date(),
	revokedBy: z.string().nullable(),
})

export type GroupQuotedRevokedMessage = z.infer<
	typeof groupQuotedRevokedMessageSchema
>
