import z from 'zod'

import { groupQuotedRevokedMessageSchema } from './quoted-revoked-message.js'

export const groupRevokedMessageSchema = groupQuotedRevokedMessageSchema

export type GroupRevokedMessage = z.infer<typeof groupRevokedMessageSchema>
