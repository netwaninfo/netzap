import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media'
import { GroupMessage, type GroupMessageProps } from './message'
import { GroupRevokedMessage } from './revoked-message'

export interface GroupVoiceMessageProps extends GroupMessageProps {
	type: 'voice'
	media: MessageMedia
}

export class GroupVoiceMessage extends GroupMessage<GroupVoiceMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	revoke(): GroupRevokedMessage {
		return GroupRevokedMessage.create(
			{
				author: this.author,
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
				GroupVoiceMessageProps,
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
		return new GroupVoiceMessage(
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
