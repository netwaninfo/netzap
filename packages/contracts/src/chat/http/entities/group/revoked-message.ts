import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { baseGroupMessage } from './message'

export const groupQuotedRevokedMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.revoked),
	revokedAt: z.date(),
	revokedBy: z.string().nullable(),
})

export type GroupQuotedRevokedMessage = z.infer<
	typeof groupQuotedRevokedMessageSchema
>

export const groupRevokedMessageSchema = groupQuotedRevokedMessageSchema.extend(
	{
		quoted: z.null(),
	},
)

export type GroupRevokedMessage = z.infer<typeof groupRevokedMessageSchema>
