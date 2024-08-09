import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupTextMessageProps extends GroupMessageProps {
	type: 'text'
	body: string
}

export class GroupTextMessage extends GroupMessage<GroupTextMessageProps> {
	get type() {
		return this.props.type
	}

	get body() {
		return this.props.body
	}

	static create(
		props: Except<
			SetOptional<
				GroupTextMessageProps,
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
		return new GroupTextMessage(
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
