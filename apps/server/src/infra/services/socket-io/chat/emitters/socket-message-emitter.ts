import {
  MessageEmitter,
  MessageEmitterPayload,
} from '@/domain/chat/application/emitters/message-emitter'
import { SocketGateway } from '../decorators/socket-gateway.decorator'

@SocketGateway()
export class SocketMessageEmitter implements MessageEmitter {
  emitChange(payload: MessageEmitterPayload): void {}

  emitCreate(payload: MessageEmitterPayload): void {}

  emitRevoked(payload: MessageEmitterPayload): void {}
}
