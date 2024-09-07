import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { baseGroupMessage } from './message'
import { groupQuotedMessageSchema } from './quoted-message'

export const groupQuotedDocumentMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.document),
	media: MessageMediaSchema,
	body: z.string().nullable(),
})

export type GroupQuotedDocumentMessage = z.infer<
	typeof groupQuotedDocumentMessageSchema
>

export const groupDocumentMessageSchema =
	groupQuotedDocumentMessageSchema.extend({
		quoted: groupQuotedMessageSchema.nullable(),
	})

export type GroupDocumentMessage = z.infer<typeof groupDocumentMessageSchema>
