import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAEntityID } from './value-objects/wa-entity-id'

export interface ChatProps {
	waChatId: WAEntityID
	instanceId: UniqueEntityID
	unreadCount: number
	lastMessageAt: Date | null
}

export abstract class Chat<Props extends ChatProps> extends Entity<Props> {
	get waChatId() {
		return this.props.waChatId
	}

	get instanceId() {
		return this.props.instanceId
	}

	get unreadCount() {
		return this.props.unreadCount
	}

	changeUnreadCount(unreadCount: number) {
		this.set({ unreadCount })
	}

	get lastMessageAt() {
		return this.props.lastMessageAt
	}
}
