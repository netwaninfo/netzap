import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { MessageStatus, MessageType } from '@netzap/contracts/enums'
import type { Attendant } from './attendant'
import type { WAEntityID } from './value-objects/wa-entity-id'
import type { WAMessageID } from './value-objects/wa-message-id'

import type { Message as QuotedMessage } from '../types/message'

export interface MessageProps {
	waId: WAMessageID
	waChatId: WAEntityID
	instanceId: UniqueEntityID
	chatId: UniqueEntityID
	quoted: QuotedMessage | null
	status: MessageStatus
	type: MessageType
	isForwarded: boolean
	isFromMe: boolean
	createdAt: Date
	sentBy: Attendant | null
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

	get isFromMe() {
		return this.props.isFromMe
	}

	get createdAt() {
		return this.props.createdAt
	}

	get sentBy() {
		return this.props.sentBy
	}
}
