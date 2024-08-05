import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import type { MessageMedia } from './message-media'
import { PrivateMessage, type PrivateMessageProps } from './private-message'

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

	static create(
		props: SetOptional<
			PrivateVoiceMessageProps,
			| 'type'
			| 'quoted'
			| 'status'
			| 'isForwarded'
			| 'isFromDevice'
			| 'sentBy'
			| 'createdAt'
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
				isFromDevice: props.isFromDevice ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
	}
}
