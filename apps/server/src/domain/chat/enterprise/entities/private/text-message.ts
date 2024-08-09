import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { PrivateMessage, type PrivateMessageProps } from './message'

export interface PrivateTextMessageProps extends PrivateMessageProps {
	type: 'text'
	body: string
}

export class PrivateTextMessage extends PrivateMessage<PrivateTextMessageProps> {
	get type() {
		return this.props.type
	}

	get body() {
		return this.props.body
	}

	static create(
		props: Except<
			SetOptional<
				PrivateTextMessageProps,
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
		return new PrivateTextMessage(
			{
				...props,
				type: 'text',
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
