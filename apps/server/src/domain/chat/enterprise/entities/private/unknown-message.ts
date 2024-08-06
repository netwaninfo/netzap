import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './message'

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
		props: Except<
			SetOptional<
				PrivateUnknownMessageProps,
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
		return new PrivateUnknownMessage(
			{
				...props,
				type: 'unknown',
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
