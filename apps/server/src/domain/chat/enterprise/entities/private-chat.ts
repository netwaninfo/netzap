import type { SetOptional } from 'type-fest'

import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Chat, type ChatProps } from './chat'

export interface PrivateChatProps extends ChatProps {
	contactId: UniqueEntityID
}

export class PrivateChat extends Chat<PrivateChatProps> {
	get contactId() {
		return this.props.contactId
	}

	static create(
		props: SetOptional<PrivateChatProps, 'lastMessageAt'>,
		id?: UniqueEntityID,
	) {
		return new PrivateChat(
			{
				...props,
				lastMessageAt: props.lastMessageAt ?? null,
			},
			id,
		)
	}
}
