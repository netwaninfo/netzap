import type { GroupChat } from '../entities/group/chat'
import type { PrivateChat } from '../entities/private/chat'

export type Chat = PrivateChat | GroupChat
