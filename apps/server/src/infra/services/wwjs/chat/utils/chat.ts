import { WWJSChat, WWJSGroupChat } from '../../types/wwjs-entities'

export class ChatUtils {
  static isGroupChat(chat: WWJSChat): chat is WWJSGroupChat {
    return chat.isGroup
  }

  static canIgnoreByServer(server: string) {
    return ['lid', 'broadcast'].includes(server)
  }

  static canIgnore(chat: WWJSChat) {
    return !chat.timestamp || ChatUtils.canIgnoreByServer(chat.id.server)
  }
}
