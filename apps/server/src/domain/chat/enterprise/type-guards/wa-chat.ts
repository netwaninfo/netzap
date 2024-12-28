import { WAGroupChat } from '../entities/wa/group/chat.js'
import { WAPrivateChat } from '../entities/wa/private/chat.js'
import type { WAChat } from '../types/wa-chat.js'

export function isWAPrivateChat(chat: WAChat): chat is WAPrivateChat {
  return chat instanceof WAPrivateChat
}

export function isWAGroupChat(chat: WAChat): chat is WAGroupChat {
  return chat instanceof WAGroupChat
}
