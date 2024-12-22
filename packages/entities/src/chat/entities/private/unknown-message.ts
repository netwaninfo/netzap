import type { z } from 'zod'

import { basePrivateUnknownMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateUnknownMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateUnknownMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateUnknownMessageSchema: PrivateUnknownMessageSchema = schema

export type PrivateUnknownMessage = z.infer<typeof privateUnknownMessageSchema>
