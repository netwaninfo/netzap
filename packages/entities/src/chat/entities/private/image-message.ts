import { z } from 'zod'

import { basePrivateImageMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateImageMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateImageMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateImageMessageSchema: PrivateImageMessageSchema = schema

export type PrivateImageMessage = z.infer<typeof privateImageMessageSchema>
