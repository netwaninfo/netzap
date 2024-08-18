import { Chat } from '../../enterprise/types/chat'

export interface ChatEmitterPayload {
	chat: Chat
}

export abstract class ChatEmitter {
	abstract emitChange(payload: ChatEmitterPayload): void
	abstract emitCreate(payload: ChatEmitterPayload): void
}
