import { z } from 'zod'

import { basePrivateAudioMessageSchema } from '../base/private'
import { privateQuotedMessageSchema } from './quoted-message'

const schema = basePrivateAudioMessageSchema.extend({
  quoted: privateQuotedMessageSchema.nullable(),
})

// TS7056
export interface PrivateAudioMessageSchema
  extends z.ZodObject<
    typeof schema.shape,
    z.UnknownKeysParam,
    z.ZodTypeAny,
    z.output<typeof schema>,
    z.input<typeof schema>
  > {}
// ------

export const privateAudioMessageSchema: PrivateAudioMessageSchema = schema

export type PrivateAudioMessage = z.infer<typeof privateAudioMessageSchema>
