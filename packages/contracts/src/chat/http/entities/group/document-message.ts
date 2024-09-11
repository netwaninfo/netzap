import z from 'zod'

import { groupQuotedDocumentMessageSchema } from './quoted-document-message.js'
import { groupQuotedMessageSchema } from './quoted-message.js'

export const groupDocumentMessageSchema =
  groupQuotedDocumentMessageSchema.extend({
    quoted: groupQuotedMessageSchema.nullable(),
  })

export type GroupDocumentMessage = z.infer<typeof groupDocumentMessageSchema>
