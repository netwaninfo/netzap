import { HandleReceivedWAMessage } from '@/domain/chat/application/handlers/handle-received-wa-message'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSMessage } from '../../types/wwjs-entities'
import { WWJSEvents, WWJSMessageTypes } from '../../types/wwjs-enums'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper'

const MESSAGES_TYPES_TO_IGNORE = [
  WWJSMessageTypes.E2E_NOTIFICATION,
  WWJSMessageTypes.GROUP_NOTIFICATION,
  WWJSMessageTypes.GROUP_INVITE,
  WWJSMessageTypes.BROADCAST_NOTIFICATION,
  WWJSMessageTypes.CALL_LOG,
  WWJSMessageTypes.CIPHERTEXT,
  WWJSMessageTypes.NOTIFICATION,
  WWJSMessageTypes.NOTIFICATION_TEMPLATE,
  WWJSMessageTypes.GP2,
]

@Handler()
export class WWJSHandleMessageReceived implements WWJSHandler {
  constructor(
    private handleReceived: HandleReceivedWAMessage,
    private chatMapper: WWJSChatMapper,
    private messageMapper: WWJSMessageMapper
  ) {}

  private ignoreMessage(message: WWJSMessage) {
    return MESSAGES_TYPES_TO_IGNORE.includes(message.type)
  }

  @SubscribeEvent(WWJSEvents.MESSAGE_RECEIVED)
  register(client: WWJSClient): WWJSListener {
    return async (message: WWJSMessage) => {
      if (this.ignoreMessage(message)) return

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
