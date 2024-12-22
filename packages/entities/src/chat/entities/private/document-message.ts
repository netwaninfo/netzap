import type { z } from 'zod'

import { basePrivateDocumentMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateDocumentMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateDocumentMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateDocumentMessageSchema: PrivateDocumentMessageSchema = schema

export type PrivateDocumentMessage = z.infer<
  typeof privateDocumentMessageSchema
>
