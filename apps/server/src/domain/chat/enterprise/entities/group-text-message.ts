import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './group-message'

export interface GroupTextMessageProps extends GroupMessageProps {
	type: 'text'
}

export class GroupTextMessage extends GroupMessage<GroupTextMessageProps> {
	get type() {
		return this.props.type
	}

	static create(
		props: SetOptional<
			GroupTextMessageProps,
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
		return new GroupTextMessage(
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
