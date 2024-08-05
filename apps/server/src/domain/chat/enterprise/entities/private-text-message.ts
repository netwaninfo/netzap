import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './private-message'

export interface PrivateTextMessageProps extends PrivateMessageProps {
	type: 'text'
}

export class PrivateTextMessage extends PrivateMessage<PrivateTextMessageProps> {
	get type() {
		return this.props.type
	}

	static create(
		props: SetOptional<
			PrivateTextMessageProps,
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
		return new PrivateTextMessage(
			{
				...props,
				type: 'text',
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
