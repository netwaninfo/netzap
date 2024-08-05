import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './group-message'

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
		props: SetOptional<
			GroupUnknownMessageProps,
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
		return new GroupUnknownMessage(
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
