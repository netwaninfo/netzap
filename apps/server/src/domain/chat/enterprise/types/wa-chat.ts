import type { WAGroupChat } from '../entities/wa/group/chat'
import type { WAPrivateChat } from '../entities/wa/private/chat'

export type WAChat = WAPrivateChat | WAGroupChat
