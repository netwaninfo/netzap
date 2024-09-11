import z from 'zod'

import { privateQuotedMessageSchema } from './quoted-message.js'
import { privateQuotedVCardMessageSchema } from './quoted-v-card-message.js'

export const privateVCardMessageSchema = privateQuotedVCardMessageSchema.extend(
  {
    quoted: privateQuotedMessageSchema.nullable(),
  }
)

export type PrivateVCardMessage = z.infer<typeof privateVCardMessageSchema>
