import type { Except, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id'
import { WAChat, type WAChatProps } from '../chat'
import type { WAGroupContact } from './contact'

export interface WAGroupChatProps extends WAChatProps {
	isGroup: true
	contact: WAGroupContact
}

export class WAGroupChat extends WAChat<WAGroupChatProps> {
	get isGroup() {
		return this.props.isGroup
	}

	get contact() {
		return this.props.contact
	}

	static create(
		props: Except<SetOptional<WAGroupChatProps, 'imageUrl'>, 'isGroup'>,
		id: WAEntityID,
	) {
		return new WAGroupChat(
			{
				...props,
				isGroup: true,
				imageUrl: props.imageUrl ?? null,
			},
			id,
		)
	}
}
