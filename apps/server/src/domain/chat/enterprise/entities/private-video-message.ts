import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import type { MessageMedia } from './message-media'
import { PrivateMessage, type PrivateMessageProps } from './private-message'

export interface PrivateVideoMessageProps extends PrivateMessageProps {
	type: 'video'
	media: MessageMedia
}

export class PrivateVideoMessage extends PrivateMessage<PrivateVideoMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	static create(
		props: SetOptional<
			PrivateVideoMessageProps,
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
		return new PrivateVideoMessage(
			{
				...props,
				type: 'video',
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
