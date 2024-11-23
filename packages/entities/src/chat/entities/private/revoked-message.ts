import { z } from 'zod'

import { basePrivateRevokedMessageSchema } from '../base/private'

export const privateRevokedMessageSchema = basePrivateRevokedMessageSchema

export type PrivateRevokedMessage = z.infer<typeof privateRevokedMessageSchema>
