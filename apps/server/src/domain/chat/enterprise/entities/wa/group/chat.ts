import type { Except, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id'
import { WAChat, type WAChatProps } from '../chat'
import type { WAGroupContact } from './contact'
import type { WAGroupMessage } from './message'

export interface WAGroupChatProps extends WAChatProps {
	isGroup: true
	contact: WAGroupContact
	lastMessage: WAGroupMessage | null
}

export class WAGroupChat extends WAChat<WAGroupChatProps> {
	get isGroup() {
		return this.props.isGroup
	}

	get contact() {
		return this.props.contact
	}

	static create(
		props: Except<
			SetOptional<WAGroupChatProps, 'imageUrl' | 'lastMessage'>,
			'isGroup'
		>,
		id: WAEntityID,
	) {
		return new WAGroupChat(
			{
				...props,
				isGroup: true,
				imageUrl: props.imageUrl ?? null,
				lastMessage: props.lastMessage ?? null,
			},
			id,
		)
	}
}
