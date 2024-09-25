import { WWJSChat, WWJSGroupChat } from '../../types/wwjs-entities'

export class ChatUtils {
  static isGroupChat(chat: WWJSChat): chat is WWJSGroupChat {
    return chat.isGroup
  }
}
