import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { MessageStatus, MessageType } from '@netzap/contracts/enums'
import type { WAEntityID } from './value-objects/wa-entity-id'
import type { WAMessageID } from './value-objects/wa-message-id'

export interface MessageProps {
	waId: WAMessageID
	waChatId: WAEntityID
	instanceId: UniqueEntityID
	chatId: UniqueEntityID
	status: MessageStatus
	type: MessageType
	isForwarded: boolean
	isGif: boolean
	isFromDevice: boolean
	createdAt: Date
	sentBy: UniqueEntityID | null
	// body: string | null
	// media: MessageMedia | null
	// contacts: Contact[] | null
	// quoted: Quoted | null
	// revokedAt: Date | null
	// revokedBy: AttendantProfile | null
}

export abstract class Message<
	Props extends MessageProps,
> extends Entity<Props> {
	get waId() {
		return this.props.waId
	}

	get waChatId() {
		return this.props.waChatId
	}

	get instanceId() {
		return this.props.instanceId
	}

	get chatId() {
		return this.props.chatId
	}

	get status() {
		return this.props.status
	}

	get isForwarded() {
		return this.props.isForwarded
	}

	get isGif() {
		return this.props.isGif
	}

	get isFromDevice() {
		return this.props.isFromDevice
	}

	get createdAt() {
		return this.props.createdAt
	}

	get sentBy() {
		return this.props.sentBy
	}
}
