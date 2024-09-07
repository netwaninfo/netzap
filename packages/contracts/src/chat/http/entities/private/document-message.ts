import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums'
import { MessageMediaSchema } from '../value-objects'
import { basePrivateMessage } from './message'
import { privateQuotedMessageSchema } from './quoted-message'

export const privateQuotedDocumentMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.document),
	media: MessageMediaSchema,
	body: z.string().nullable(),
})

export type PrivateQuotedDocumentMessage = z.infer<
	typeof privateQuotedDocumentMessageSchema
>

export const privateDocumentMessageSchema =
	privateQuotedDocumentMessageSchema.extend({
		quoted: privateQuotedMessageSchema.nullable(),
	})

export type PrivateDocumentMessage = z.infer<
	typeof privateDocumentMessageSchema
>
