import {
  type ChatReadClientEventPayload,
  chatReadClientEventPayloadSchema,
} from '@netzap/websocket/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HandleChatRead } from '@/domain/chat/application/handlers/handle-chat-read'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WsException } from '@nestjs/websockets'
import { SocketEventPayload } from '../decorators/socket-event-payload.decorator'
import { SocketGateway } from '../decorators/socket-gateway.decorator'
import { SocketInstanceId } from '../decorators/socket-instance-id.decorator'
import { SocketSubscribeEvent } from '../decorators/socket-subscribe-event.decorator'

@SocketGateway()
export class SocketHandleChatRead {
  constructor(private handleChatRead: HandleChatRead) {}

  @SocketSubscribeEvent('chat:read')
  async handle(
    @SocketEventPayload(chatReadClientEventPayloadSchema)
    payload: ChatReadClientEventPayload,
    @SocketInstanceId() instanceId: string
  ): Promise<void> {
    const { waChatId } = payload

    const response = await this.handleChatRead.execute({
      instanceId: UniqueEntityID.create(instanceId),
      waChatId: WAEntityID.createFromString(waChatId),
    })

    if (response.isFailure()) {
      throw new WsException(response.value)
    }
  }
}
