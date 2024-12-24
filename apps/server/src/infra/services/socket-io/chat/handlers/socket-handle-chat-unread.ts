import {
  type ChatUnreadClientEventPayload,
  chatUnreadClientEventPayloadSchema,
} from '@netzap/websocket/chat'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { HandleChatUnread } from '@/domain/chat/application/handlers/handle-chat-unread'
import { WAEntityID } from '@/domain/chat/enterprise/entities/value-objects/wa-entity-id'
import { WsException } from '@nestjs/websockets'
import { SocketEventPayload } from '../decorators/socket-event-payload.decorator'
import { SocketGateway } from '../decorators/socket-gateway.decorator'
import { SocketInstanceId } from '../decorators/socket-instance-id.decorator'
import { SocketSubscribeEvent } from '../decorators/socket-subscribe-event.decorator'

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
