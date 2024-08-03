import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { Message, type MessageProps } from './message'

export interface UnknownMessageProps extends MessageProps {
	type: 'unknown'
	payload: unknown
}

export class UnknownMessage extends Message<UnknownMessageProps> {
	get type() {
		return this.props.type
	}

	get payload() {
		return this.props.payload
	}

	static create(
		props: SetOptional<
			UnknownMessageProps,
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
		return new UnknownMessage(
			{
				...props,
				type: 'unknown',
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
