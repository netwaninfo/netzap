import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import type { MessageMedia } from './message-media'
import { PrivateMessage, type PrivateMessageProps } from './private-message'

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
		props: SetOptional<
			PrivateAudioMessageProps,
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
		return new PrivateAudioMessage(
			{
				...props,
				type: 'audio',
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
