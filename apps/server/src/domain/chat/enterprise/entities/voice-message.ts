import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { Message, type MessageProps } from './message'
import type { MessageMedia } from './message-media'

export interface VoiceMessageProps extends MessageProps {
	type: 'voice'
	media: MessageMedia
}

export class VoiceMessage extends Message<VoiceMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	static create(
		props: SetOptional<
			VoiceMessageProps,
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
		return new VoiceMessage(
			{
				...props,
				type: 'voice',
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
