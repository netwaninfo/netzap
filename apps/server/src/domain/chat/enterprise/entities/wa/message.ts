import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { WAEntity } from '@/core/entities/wa-entity'
import type { MessageStatus, MessageType } from '@netzap/contracts/enums'
import type { SetNonNullable } from 'type-fest'
import type { WAEntityID } from '../value-objects/wa-entity-id'
import type { WAMessageID } from '../value-objects/wa-message-id'
import type { WAPrivateContact } from './private/contact'
import type { WAMessageMedia } from './value-objects/message-media'

export interface WAMessageProps {
	chatId: WAEntityID
	deviceId: UniqueEntityID
	ack: MessageStatus
	type: MessageType
	body: string | null
	timestamp: number
	isForwarded: boolean
	isFromMe: boolean
	media: WAMessageMedia | null
	contacts: WAPrivateContact[] | null
}

const MESSAGE_MEDIA_TYPES: MessageType[] = [
	'image',
	'video',
	'voice',
	'document',
]

const MESSAGE_CONTACTS_TYPES: MessageType[] = ['vcard', 'multi_vcard']

export abstract class WAMessage<Props extends WAMessageProps> extends WAEntity<
	Props,
	WAMessageID
> {
	get chatId() {
		return this.props.chatId
	}

	get deviceId() {
		return this.props.deviceId
	}

	get ack() {
		return this.props.ack
	}

	get type() {
		return this.props.type
	}

	get body() {
		return this.props.body
	}

	get timestamp() {
		return this.props.timestamp
	}

	get isForwarded() {
		return this.props.isForwarded
	}

	get isFromMe() {
		return this.props.isFromMe
	}

	get media() {
		return this.props.media
	}

	hasMedia(): this is SetNonNullable<Props, 'media'> {
		return MESSAGE_MEDIA_TYPES.includes(this.type) && !!this.media
	}

	get contacts() {
		return this.props.contacts
	}

	hasContacts(): this is SetNonNullable<Props, 'contacts'> {
		return MESSAGE_CONTACTS_TYPES.includes(this.type) && !!this.contacts?.length
	}

	get ref() {
		return `${this.deviceId.toString()}/${this.chatId.toString()}/${this.id.toString()}`
	}
}
