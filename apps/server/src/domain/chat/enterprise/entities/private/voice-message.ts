import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media'
import { PrivateMessage, type PrivateMessageProps } from './message'
import { PrivateRevokedMessage } from './revoked-message'

export interface PrivateVoiceMessageProps extends PrivateMessageProps {
	type: 'voice'
	media: MessageMedia
}

export class PrivateVoiceMessage extends PrivateMessage<PrivateVoiceMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	revoke(): PrivateRevokedMessage {
		return PrivateRevokedMessage.create(
			{
				chatId: this.chatId,
				instanceId: this.instanceId,
				waChatId: this.waChatId,
				waMessageId: this.waMessageId,
				isForwarded: this.isForwarded,
				createdAt: this.createdAt,
				revokedAt: new Date(),
				isFromMe: this.isFromMe,
				status: this.status,
			},
			this.id,
		)
	}

	static create(
		props: Except<
			SetOptional<
				PrivateVoiceMessageProps,
				| 'quoted'
				| 'status'
				| 'isForwarded'
				| 'isFromMe'
				| 'sentBy'
				| 'createdAt'
			>,
			'type'
		>,
		id?: UniqueEntityID,
	) {
		return new PrivateVoiceMessage(
			{
				...props,
				type: 'voice',
				quoted: props.quoted ?? null,
				status: props.status ?? 'pending',
				isForwarded: props.isForwarded ?? false,
				isFromMe: props.isFromMe ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
	}
}
