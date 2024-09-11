import { WAGroupChat } from '../entities/wa/group/chat'
import { WAPrivateChat } from '../entities/wa/private/chat'
import type { WAChat } from '../types/wa-chat'

export function isWAPrivateChat(chat: WAChat): chat is WAPrivateChat {
  return chat instanceof WAPrivateChat
}

export function isWAGroupChat(chat: WAChat): chat is WAGroupChat {
  return chat instanceof WAGroupChat
}
