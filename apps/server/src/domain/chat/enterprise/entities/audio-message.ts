import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { Message, type MessageProps } from './message'
import type { MessageMedia } from './message-media'

export interface AudioMessageProps extends MessageProps {
	type: 'audio'
	media: MessageMedia
}

export class AudioMessage extends Message<AudioMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	static create(
		props: SetOptional<
			AudioMessageProps,
			| 'type'
			| 'quotedId'
			| 'status'
			| 'isGif'
			| 'isForwarded'
			| 'isFromDevice'
			| 'sentBy'
			| 'createdAt'
		>,
		id?: UniqueEntityID,
	) {
		return new AudioMessage(
			{
				...props,
				type: 'audio',
				quotedId: props.quotedId ?? null,
				status: props.status ?? 'pending',
				isGif: props.isGif ?? false,
				isForwarded: props.isForwarded ?? false,
				isFromDevice: props.isFromDevice ?? true,
				sentBy: props.sentBy ?? null,
				createdAt: props.createdAt ?? new Date(),
			},
			id,
		)
	}
}
