import { WebSocketServer } from '@nestjs/websockets'
import {} from 'socket.io'

import {
  ChatEmitter,
  ChatEmitterPayload,
} from '@/domain/chat/application/emitters/chat-emitter'
import { Chat } from '@/domain/chat/enterprise/types/chat'
import { ChatPresenter } from '@/infra/presenters/chat/chat-presenter'
import type { SocketServer } from '../../types/socket-server'
import { SocketGateway } from '../decorators/socket-gateway.decorator'

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
