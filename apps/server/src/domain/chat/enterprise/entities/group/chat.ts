import type { SetNonNullable, SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { GroupMessage } from '../../types/message'
import { Chat, type ChatProps } from '../chat'

export interface GroupChatProps extends ChatProps {
	groupId: UniqueEntityID
	lastMessage: GroupMessage | null
}

export class GroupChat extends Chat<GroupChatProps> {
	get groupId() {
		return this.props.groupId
	}

	get lastMessage() {
		return this.props.lastMessage
	}

	hasLastMessage(): this is SetNonNullable<GroupChatProps, 'lastMessage'> {
		return !!this.lastMessage
	}

	static create(
		props: SetOptional<GroupChatProps, 'lastMessage'>,
		id?: UniqueEntityID,
	) {
		return new GroupChat(
			{
				...props,
				lastMessage: props.lastMessage ?? null,
			},
			id,
		)
	}
}
