import type { GroupChat } from '../entities/group/chat.js'
import type { PrivateChat } from '../entities/private/chat.js'

export type Chat = PrivateChat | GroupChat
