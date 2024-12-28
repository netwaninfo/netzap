import type { WWJSChat, WWJSGroupChat } from '../../types/wwjs-entities.js'

export class ChatUtils {
  static isGroupChat(chat: WWJSChat): chat is WWJSGroupChat {
    return chat.isGroup || chat.id.server === 'g.us'
  }

  static canIgnoreByServer(server: string) {
    return ['lid', 'broadcast'].includes(server)
  }

  static canIgnore(chat: WWJSChat) {
    return !chat.timestamp || ChatUtils.canIgnoreByServer(chat.id.server)
  }
}
