import { HandleChangeWAMessageACK } from '@/domain/chat/application/handlers/handle-change-wa-message-ack.js'
import { Handler } from '../../decorators/handler.decorator.js'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator.js'
import type { WWJSMessage } from '../../types/wwjs-entities.js'
import { WWJSEvents, WWJSMessageACK } from '../../types/wwjs-enums.js'
import { type WWJSListener } from '../../types/wwjs-handler.js'
import { WWJSClient } from '../../wwjs-client.js'
import { WWJSMessageACKMapper } from '../mappers/wwjs-message-ack-mapper.js'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper.js'

@Handler()
export class WWJSHandleMessageAck {
  constructor(
    private handleChangeACK: HandleChangeWAMessageACK,
    private messageMapper: WWJSMessageMapper
  ) {}

  @SubscribeEvent(WWJSEvents.MESSAGE_ACK)
  register(client: WWJSClient): WWJSListener {
    return async (message: WWJSMessage, messageAck: WWJSMessageACK) => {
      const waMessage = await this.messageMapper.toDomain({ message, client })
      const ack = WWJSMessageACKMapper.toDomain(messageAck)

      await this.handleChangeACK.execute({
        ack,
        waMessage,
      })
    }
  }
}
