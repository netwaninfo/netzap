import type { SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Chat, type ChatProps } from './chat'

export interface GroupChatProps extends ChatProps {
	contactId: UniqueEntityID
}

export class GroupChat extends Chat<GroupChatProps> {
	get contactId() {
		return this.props.contactId
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
