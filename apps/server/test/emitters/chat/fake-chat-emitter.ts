import type {
  ChatEmitter,
  ChatEmitterPayload,
} from '@/domain/chat/application/emitters/chat-emitter.js'

export class FakeChatEmitter implements ChatEmitter {
  items: ChatEmitterPayload[] = []

  emitChange(payload: ChatEmitterPayload): void {
    this.items.push(payload)
  }

  emitCreate(payload: ChatEmitterPayload): void {
    this.items.push(payload)
  }
}
