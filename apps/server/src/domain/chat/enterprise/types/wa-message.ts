import type { WAGroupMessage } from '../entities/wa/group/message'
import type { WAPrivateMessage } from '../entities/wa/private/message'

export type WAMessage = WAPrivateMessage | WAGroupMessage
