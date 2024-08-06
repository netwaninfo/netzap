import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media'
import { PrivateMessage, type PrivateMessageProps } from './message'

export interface PrivateAudioMessageProps extends PrivateMessageProps {
	type: 'audio'
	media: MessageMedia
}

export class PrivateAudioMessage extends PrivateMessage<PrivateAudioMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	static create(
		props: Except<
			SetOptional<
				PrivateAudioMessageProps,
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
		return new PrivateAudioMessage(
			{
				...props,
				type: 'audio',
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
