import { WebSocketServer } from '@nestjs/websockets'
import {} from 'socket.io'

import {
  MessageEmitter,
  MessageEmitterPayload,
} from '@/domain/chat/application/emitters/message-emitter'
import { Message } from '@/domain/chat/enterprise/types/message'
import { MessagePresenter } from '@/infra/presenters/chat/message-presenter'
import type { SocketServer } from '../../types/socket-server'
import { SocketGateway } from '../decorators/socket-gateway.decorator'

@SocketGateway()
export class SocketMessageEmitter implements MessageEmitter {
  @WebSocketServer()
  private io!: SocketServer

  private getRoom(message: Message) {
    return message.instanceId.toString()
  }

  emitChange({ message }: MessageEmitterPayload): void {
    const roomId = this.getRoom(message)

    this.io.to(roomId).emit('message:change', {
      message: MessagePresenter.toOutput(message),
    })
  }

  emitCreate({ message }: MessageEmitterPayload): void {
    const roomId = this.getRoom(message)

    this.io.to(roomId).emit('message:create', {
      message: MessagePresenter.toOutput(message),
    })
  }

  emitRevoked({ message }: MessageEmitterPayload): void {
    const roomId = this.getRoom(message)

    this.io.to(roomId).emit('message:revoked', {
      message: MessagePresenter.toOutput(message),
    })
  }
}
