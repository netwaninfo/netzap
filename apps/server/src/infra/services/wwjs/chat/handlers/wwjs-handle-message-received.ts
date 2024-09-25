import { HandleReceivedWAMessage } from '@/domain/chat/application/handlers/handle-received-wa-message'
import { Injectable } from '@nestjs/common'
import { WWJSMessage } from '../../types/wwjs-entities'
import { WWJSEvents } from '../../types/wwjs-enums'
import { WWJSHandler, WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSFactory } from '../../wwjs-factory.service'
import { WWJSChatMapper } from '../mappers/wwjs-chat-mapper'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper'

@Injectable()
export class WWJSHandleMessageReceived implements WWJSHandler {
  constructor(
    private factory: WWJSFactory,
    private handleReceived: HandleReceivedWAMessage,
    private chatMapper: WWJSChatMapper,
    private messageMapper: WWJSMessageMapper
  ) {
    this.factory.addHandler(this)
  }

  event = WWJSEvents.MESSAGE_RECEIVED

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
