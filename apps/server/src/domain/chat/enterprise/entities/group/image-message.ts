import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Except, SetOptional } from 'type-fest'
import type { MessageMedia } from '../message-media'
import { GroupMessage, type GroupMessageProps } from './message'

export interface GroupImageMessageProps extends GroupMessageProps {
	type: 'image'
	media: MessageMedia
}

export class GroupImageMessage extends GroupMessage<GroupImageMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	static create(
		props: Except<
			SetOptional<
				GroupImageMessageProps,
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
		return new GroupImageMessage(
			{
				...props,
				type: 'image',
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
