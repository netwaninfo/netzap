import z from 'zod'

import { privateQuotedDocumentMessageSchema } from './quoted-document-message.js'
import { privateQuotedMessageSchema } from './quoted-message.js'

export const privateDocumentMessageSchema =
	privateQuotedDocumentMessageSchema.extend({
		quoted: privateQuotedMessageSchema.nullable(),
	})

export type PrivateDocumentMessage = z.infer<
	typeof privateDocumentMessageSchema
>
