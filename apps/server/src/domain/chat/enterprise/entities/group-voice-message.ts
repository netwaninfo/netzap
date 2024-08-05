import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { SetOptional } from 'type-fest'
import { GroupMessage, type GroupMessageProps } from './group-message'
import type { MessageMedia } from './message-media'

export interface GroupVoiceMessageProps extends GroupMessageProps {
	type: 'voice'
	media: MessageMedia
}

export class GroupVoiceMessage extends GroupMessage<GroupVoiceMessageProps> {
	get type() {
		return this.props.type
	}

	get media() {
		return this.props.media
	}

	static create(
		props: SetOptional<
			GroupVoiceMessageProps,
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
		return new GroupVoiceMessage(
			{
				...props,
				type: 'voice',
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
