import z from 'zod'

import { privateQuotedRevokedMessageSchema } from './quoted-revoked-message.js'

export const privateRevokedMessageSchema =
	privateQuotedRevokedMessageSchema.extend({})

export type PrivateRevokedMessage = z.infer<typeof privateRevokedMessageSchema>
