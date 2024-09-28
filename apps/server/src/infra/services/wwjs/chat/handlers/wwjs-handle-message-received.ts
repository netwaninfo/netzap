import { HandleReceivedWAMessage } from '@/domain/chat/application/handlers/handle-received-wa-message'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSMessage } from '../../types/wwjs-entities'
import { WWJSEvents } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper'

@Handler()
export class WWJSHandleMessageReceived implements WWJSHandler {
  constructor(
    private handleReceived: HandleReceivedWAMessage,
    private chatMapper: WWJSChatMapper,
    private messageMapper: WWJSMessageMapper
  ) {}

  @SubscribeEvent(WWJSEvents.MESSAGE_RECEIVED)
  register(client: WWJSClient): WWJSListener {
    return async (message: WWJSMessage) => {
      const chat = await message.getChat()

      const [waChat, waMessage] = await Promise.all([
        this.chatMapper.toDomain({
          client,
          chat,
        }),
        this.messageMapper.toDomain({
          client,
          message,
        }),
      ])

      await this.handleReceived.execute({
        waChat,
        waMessage,
      })
    }
  }
}
