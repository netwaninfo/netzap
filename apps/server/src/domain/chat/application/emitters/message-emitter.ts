import type { Message } from '../../enterprise/types/message.js'

export interface MessageEmitterPayload {
  message: Message
}

export abstract class MessageEmitter {
  abstract emitChange(payload: MessageEmitterPayload): void
  abstract emitCreate(payload: MessageEmitterPayload): void
  abstract emitRevoked(payload: MessageEmitterPayload): void
}
