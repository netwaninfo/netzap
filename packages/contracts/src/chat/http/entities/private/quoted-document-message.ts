import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { basePrivateMessage } from './message.js'

export const privateQuotedDocumentMessageSchema = basePrivateMessage.extend({
	type: z.literal(messageTypeSchema.Values.document),
	media: messageMediaSchema,
	body: z.string().nullable(),
})

export type PrivateQuotedDocumentMessage = z.infer<
	typeof privateQuotedDocumentMessageSchema
>
