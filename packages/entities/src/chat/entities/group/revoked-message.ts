import { z } from 'zod'

import { baseGroupRevokedMessageSchema } from '../base/group'

export const groupRevokedMessageSchema = baseGroupRevokedMessageSchema

export type GroupRevokedMessage = z.infer<typeof groupRevokedMessageSchema>
