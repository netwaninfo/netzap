import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './private-message'

export interface PrivateUnknownMessageProps extends PrivateMessageProps {
	type: 'unknown'
	payload: unknown
}

export class PrivateUnknownMessage extends PrivateMessage<PrivateUnknownMessageProps> {
	get type() {
		return this.props.type
	}

	get payload() {
		return this.props.payload
	}

	static create(
		props: SetOptional<
			PrivateUnknownMessageProps,
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
		return new PrivateUnknownMessage(
			{
				...props,
				type: 'unknown',
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
