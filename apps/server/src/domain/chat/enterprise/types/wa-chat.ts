import type { WAGroupChat } from '../entities/wa/group/chat.js'
import type { WAPrivateChat } from '../entities/wa/private/chat.js'

export type WAChat = WAPrivateChat | WAGroupChat
