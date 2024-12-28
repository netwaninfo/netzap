import { GroupChat } from '../entities/group/chat.js'
import { PrivateChat } from '../entities/private/chat.js'
import type { Chat } from '../types/chat.js'

export function isPrivateChat(chat: Chat): chat is PrivateChat {
  return chat instanceof PrivateChat
}

export function isGroupChat(chat: Chat): chat is GroupChat {
  return chat instanceof GroupChat
}
