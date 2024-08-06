import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupUnknownMessageProps extends GroupMessageProps {
	type: 'unknown'
	payload: unknown
}

export class GroupUnknownMessage extends GroupMessage<GroupUnknownMessageProps> {
	get type() {
		return this.props.type
	}

	get payload() {
		return this.props.payload
	}

	static create(
		props: Except<
			SetOptional<
				GroupUnknownMessageProps,
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
		return new GroupUnknownMessage(
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
