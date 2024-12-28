import type { WAGroupMessage } from '../entities/wa/group/message.js'
import type { WAPrivateMessage } from '../entities/wa/private/message.js'

export type WAMessage = WAPrivateMessage | WAGroupMessage
