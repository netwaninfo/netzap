import { z } from 'zod'

import { messageTypeSchema } from '@/chat/enums/index.js'
import { messageMediaSchema } from '../message-media.js'
import { baseGroupMessage } from './message.js'

export const groupQuotedDocumentMessageSchema = baseGroupMessage.extend({
	type: z.literal(messageTypeSchema.Values.document),
	media: messageMediaSchema,
	body: z.string().nullable(),
})

export type GroupQuotedDocumentMessage = z.infer<
	typeof groupQuotedDocumentMessageSchema
>
