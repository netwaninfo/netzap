import {
	MessageEmitter,
	MessageEmitterPayload,
} from '@/domain/chat/application/emitters/message-emitter'

export class FakeMessageEmitter implements MessageEmitter {
	items: MessageEmitterPayload[] = []

	emitChange(payload: MessageEmitterPayload): void {
		this.items.push(payload)
	}

	emitCreate(payload: MessageEmitterPayload): void {
		this.items.push(payload)
	}

	emitRevoked(payload: MessageEmitterPayload): void {
		this.items.push(payload)
	}
}
