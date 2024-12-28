import { HandleRevokeWAMessage } from '@/domain/chat/application/handlers/handle-revoke-wa-message.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import type { WWJSMessage } from '../../types/wwjs-entities.js'
import { WWJSEvents } from '../../types/wwjs-enums.js'
import { type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper.js'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper.js'

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
