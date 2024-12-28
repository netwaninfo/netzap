import { WsException } from '@nestjs/websockets'
import {
  type ChatUnreadClientEventPayload,
  chatUnreadClientEventPayloadSchema,
} from '@netzap/websocket/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id.js'
import { HandleChatUnread } from '@/domain/chat/application/handlers/handle-chat-unread.js'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id.js'
import { SocketEventPayload } from '../decorators/socket-event-payload.decorator.js'
import { SocketGateway } from '../decorators/socket-gateway.decorator.js'
import { SocketInstanceId } from '../decorators/socket-instance-id.decorator.js'
import { SocketSubscribeEvent } from '../decorators/socket-subscribe-event.decorator.js'

@SocketGateway()
export class SocketHandleChatUnread {
  constructor(private handleChatUnread: HandleChatUnread) {}

  @SocketSubscribeEvent('chat:unread')
  async handle(
    @SocketEventPayload(chatUnreadClientEventPayloadSchema)
    payload: ChatUnreadClientEventPayload,
    @SocketInstanceId() instanceId: string
  ): Promise<void> {
    const { waChatId } = payload

    const response = await this.handleChatUnread.execute({
      instanceId: UniqueEntityID.create(instanceId),
      waChatId: WAEntityID.createFromString(waChatId),
    })

    if (response.isFailure()) {
      throw new WsException(response.value)
    }
  }
}
