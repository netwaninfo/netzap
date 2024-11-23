import { z } from 'zod'

import { basePrivateVideoMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateVideoMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateVideoMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateVideoMessageSchema: PrivateVideoMessageSchema = schema

export type PrivateVideoMessage = z.infer<typeof privateVideoMessageSchema>
