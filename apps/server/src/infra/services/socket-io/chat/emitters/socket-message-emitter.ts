import {
  MessageEmitter,
  MessageEmitterPayload,
} from '@/domain/chat/application/emitters/message-emitter'
import { Message } from '@/domain/chat/enterprise/types/message'
import { SocketGateway } from '../decorators/socket-gateway.decorator'

@SocketGateway()
export class SocketMessageEmitter implements MessageEmitter {
  private getRoom(message: Message) {
    return message.instanceId.toString()
  }

  emitChange({ message }: MessageEmitterPayload): void {
    const roomId = this.getRoom(message)
  }

  emitCreate({ message }: MessageEmitterPayload): void {}

  emitRevoked({ message }: MessageEmitterPayload): void {}
}
