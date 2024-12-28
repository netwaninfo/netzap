import { WebSocketServer } from '@nestjs/websockets'

import type {
  MessageEmitter,
  MessageEmitterPayload,
} from '@/domain/chat/application/emitters/message-emitter.js'
import type { Message } from '@/domain/chat/enterprise/types/message.js'
import { MessagePresenter } from '@/infra/presenters/chat/message-presenter.js'
import type { SocketServer } from '../../types/socket-server.js'
import { SocketGateway } from '../decorators/socket-gateway.decorator.js'

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
