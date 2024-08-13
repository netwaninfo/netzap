import type { SetNonNullable, SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { PrivateMessage } from '../../types/message'
import { Chat, type ChatProps } from '../chat'

export interface PrivateChatProps extends ChatProps {
	contactId: UniqueEntityID
	lastMessage: PrivateMessage | null
}

export class PrivateChat extends Chat<PrivateChatProps> {
	get contactId() {
		return this.props.contactId
	}

	get lastMessage() {
		return this.props.lastMessage
	}

	hasLastMessage(): this is SetNonNullable<PrivateChat, 'lastMessage'> {
		return !!this.lastMessage
	}

	static create(
		props: SetOptional<PrivateChatProps, 'lastMessage'>,
		id?: UniqueEntityID,
	) {
		return new PrivateChat(
			{
				...props,
				lastMessage: props.lastMessage ?? null,
			},
			id,
		)
	}
}
