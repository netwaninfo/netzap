import { HandleChangeWAChatUnreadCount } from '@/domain/chat/application/handlers/handle-change-wa-chat-unread-count.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import type { WWJSChat } from '../../types/wwjs-entities.js'
import { WWJSInternalEvents } from '../../types/wwjs-enums.js'
import { type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper.js'

@Handler()
export class WWJSHandleChatUnreadCount {
  constructor(
    private handleUnreadChange: HandleChangeWAChatUnreadCount,
    private chatMapper: WWJSChatMapper
  ) {}

  @SubscribeEvent(WWJSInternalEvents.CHAT_UNREAD_COUNT)
  register(client: WWJSClient): WWJSListener {
    return async (chat: WWJSChat) => {
      const waChat = await this.chatMapper.toDomain({ chat, client })

      await this.handleUnreadChange.execute({
        waChat,
      })
    }
  }
}
