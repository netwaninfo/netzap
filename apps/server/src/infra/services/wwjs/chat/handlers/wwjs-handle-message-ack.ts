import { HandleChangeWAMessageACK } from '@/domain/chat/application/handlers/handle-change-wa-message-ack'
import { Handler } from '../../decorators/handler.decorator'
import { SubscribeEvent } from '../../decorators/subscribe-event.decorator'
import { WWJSMessage } from '../../types/wwjs-entities'
import { WWJSEvents, WWJSMessageACK } from '../../types/wwjs-enums'
import { type WWJSListener } from '../../types/wwjs-handler'
import { WWJSClient } from '../../wwjs-client'
import { WWJSMessageACKMapper } from '../mappers/wwjs-message-ack-mapper'
import { WWJSMessageMapper } from '../mappers/wwjs-message-mapper'

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
