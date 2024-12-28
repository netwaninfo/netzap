import { WebSocketServer } from '@nestjs/websockets'

import type {
  ChatEmitter,
  ChatEmitterPayload,
} from '@/domain/chat/application/emitters/chat-emitter.js'
import type { Chat } from '@/domain/chat/enterprise/types/chat.js'
import { ChatPresenter } from '@/infra/presenters/chat/chat-presenter.js'
import type { SocketServer } from '../../types/socket-server.js'
import { SocketGateway } from '../decorators/socket-gateway.decorator.js'

@SocketGateway()
export class SocketChatEmitter implements ChatEmitter {
  @WebSocketServer()
  private io!: SocketServer

  private getRoom(chat: Chat) {
    return chat.instanceId.toString()
  }

  emitChange({ chat }: ChatEmitterPayload): void {
    const roomId = this.getRoom(chat)

    this.io.to(roomId).emit('chat:change', {
      chat: ChatPresenter.toOutput(chat),
    })
  }

  emitCreate({ chat }: ChatEmitterPayload): void {
    const roomId = this.getRoom(chat)

    this.io.to(roomId).emit('chat:create', {
      chat: ChatPresenter.toOutput(chat),
    })
  }
}
