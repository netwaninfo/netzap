import { WsException } from '@nestjs/websockets'
import {
  type ChatReadClientEventPayload,
  chatReadClientEventPayloadSchema,
} from '@netzap/websocket/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { HandleChatRead } from '@/domain/chat/application/handlers/handle-chat-read.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { SocketEventPayload } from '../decorators/socket-event-payload.decorator.js'
import { SocketGateway } from '../decorators/socket-gateway.decorator.js'
import { SocketInstanceId } from '../decorators/socket-instance-id.decorator.js'
import { SocketSubscribeEvent } from '../decorators/socket-subscribe-event.decorator.js'

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
