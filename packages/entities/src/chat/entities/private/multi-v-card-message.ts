import { z } from 'zod'

import { basePrivateMultiVCardMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateMultiVCardMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateMultiVCardMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateMultiVCardMessageSchema: PrivateMultiVCardMessageSchema =
  schema

export type PrivateMultiVCardMessage = z.infer<
  typeof privateMultiVCardMessageSchema
>
