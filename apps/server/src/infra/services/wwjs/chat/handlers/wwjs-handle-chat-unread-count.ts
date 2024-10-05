import { HandleChangeWAChatUnreadCount } from '@/domain/chat/application/handlers/handle-change-wa-chat-unread-count'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSChat } from '../../types/wwjs-entities'
import { WWJSInternalEvents } from '../../types/wwjs-enums'
import { type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper'

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
