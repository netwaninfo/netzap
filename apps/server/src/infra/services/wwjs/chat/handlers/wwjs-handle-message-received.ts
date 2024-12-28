import timers from 'node:timers/promises'

import { HandleReceivedWAMessage } from '@/domain/chat/application/handlers/handle-received-wa-message.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import type { WWJSMessage } from '../../types/wwjs-entities.js'
import { WWJSEvents } from '../../types/wwjs-enums.js'
import { WWJSHandler, type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper.js'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper.js'
import { ChatUtils } from '../utils/chat.js'
import { MessageUtils } from '../utils/message.js'

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
      if (MessageUtils.canIgnore(message.type)) return

      // Used to ensure chat information has loaded
      await timers.setTimeout(300)

      const chat = await message.getChat()
      if (ChatUtils.canIgnore(chat)) return

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
