import {
	ChatEmitter,
	ChatEmitterPayload,
} from '@/domain/chat/application/emitters/chat-emitter'

export class FakeChatEmitter implements ChatEmitter {
	items: ChatEmitterPayload[] = []

	emitChange(payload: ChatEmitterPayload): void {
		this.items.push(payload)
	}

	emitCreate(payload: ChatEmitterPayload): void {
		this.items.push(payload)
	}
}
