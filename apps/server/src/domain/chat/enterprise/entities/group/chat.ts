import type { SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Chat, type ChatProps } from '../chat'

export interface GroupChatProps extends ChatProps {
	groupId: UniqueEntityID
}

export class GroupChat extends Chat<GroupChatProps> {
	get groupId() {
		return this.props.groupId
	}

	static create(
		props: SetOptional<GroupChatProps, 'lastMessageAt'>,
		id?: UniqueEntityID,
	) {
		return new GroupChat(
			{
				...props,
				lastMessageAt: props.lastMessageAt ?? null,
			},
			id,
		)
	}
}
