import { HandleRevokeWAMessage } from '@/domain/chat/application/handlers/handle-revoke-wa-message'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSMessage } from '../../types/wwjs-entities'
import { WWJSEvents } from '../../types/wwjs-enums'
import { type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper'

@Handler()
export class WWJSHandleMessageRevokedEveryone {
  constructor(
    private handleRevoked: HandleRevokeWAMessage,
    private chatMapper: WWJSChatMapper,
    private messageMapper: WWJSMessageMapper
  ) {}

  @SubscribeEvent(WWJSEvents.MESSAGE_REVOKED_EVERYONE)
  register(client: WWJSClient): WWJSListener {
    return async (message: WWJSMessage) => {
      const chat = await message.getChat()

      const [waChat, waRevokedMessage] = await Promise.all([
        this.chatMapper.toDomain({ chat, client }),
        this.messageMapper.toDomain({ client, message }),
      ])

      await this.handleRevoked.execute({
        waChat,
        waRevokedMessage,
      })
    }
  }
}
