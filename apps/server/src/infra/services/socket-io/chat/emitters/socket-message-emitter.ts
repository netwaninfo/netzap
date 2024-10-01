import {
  MessageEmitter,
  MessageEmitterPayload,
} from '@/domain/chat/application/emitters/message-emitter'
import { SocketGateway } from '../decorators/socket-gateway.decorator'

@SocketGateway()
export class SocketMessageEmitter implements MessageEmitter {
  emitChange(payload: MessageEmitterPayload): void {
    throw new Error('Method not implemented.')
  }

  emitCreate(payload: MessageEmitterPayload): void {
    throw new Error('Method not implemented.')
  }

  emitRevoked(payload: MessageEmitterPayload): void {
    throw new Error('Method not implemented.')
  }
}
