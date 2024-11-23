import { z } from 'zod'

import { basePrivateVCardMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateVCardMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateVCardMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateVCardMessageSchema: PrivateVCardMessageSchema = schema

export type PrivateVCardMessage = z.infer<typeof privateVCardMessageSchema>
