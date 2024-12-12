import {
  type MessageSendTextClientEventPayload,
  messageSendTextClientEventPayloadSchema,
} from '@netzap/websocket/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HandleSendTextMessage } from '@/domain/chat/application/handlers/handle-send-text-message'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WAMessageID } from '@/domain/chat/enterprise/entities/value-objects/wa-message-id'
import { SocketUserId } from '@/infra/auth/decorators/socket-user-id.decorator'
import { WsException } from '@nestjs/websockets'
import { SocketEventPayload } from '../decorators/socket-event-payload.decorator'
import { SocketGateway } from '../decorators/socket-gateway.decorator'
import { SocketInstanceId } from '../decorators/socket-instance-id.decorator'
import { SocketSubscribeEvent } from '../decorators/socket-subscribe-event.decorator'

@SocketGateway()
export class SocketHandleSendTextMessage {
  constructor(private handleSendTextMessage: HandleSendTextMessage) {}

  @SocketSubscribeEvent('message:send:text')
  async handle(
    @SocketEventPayload(messageSendTextClientEventPayloadSchema)
    payload: MessageSendTextClientEventPayload,
    @SocketInstanceId() instanceId: string,
    @SocketUserId() userId: string
  ): Promise<void> {
    const { waChatId, body, quotedId } = payload

    const response = await this.handleSendTextMessage.execute({
      body,
      instanceId: UniqueEntityID.create(instanceId),
      waChatId: WAEntityID.createFromString(waChatId),
      attendantId: UniqueEntityID.create(userId),
      ...(quotedId && { quotedId: WAMessageID.createFromString(quotedId) }),
    })

    if (response.isFailure() && response.value) {
      throw new WsException(response.value)
    }
  }
}
