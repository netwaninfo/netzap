import type { Except, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id'
import { WAChat, type WAChatProps } from '../chat'
import type { WAPrivateContact } from './contact'

export interface WAPrivateChatProps extends WAChatProps {
	isGroup: false
	contact: WAPrivateContact
}

export class WAPrivateChat extends WAChat<WAPrivateChatProps> {
	get isGroup() {
		return this.props.isGroup
	}

	get contact() {
		return this.props.contact
	}

	static create(
		props: Except<SetOptional<WAPrivateChatProps, 'imageUrl'>, 'isGroup'>,
		id: WAEntityID,
	) {
		return new WAPrivateChat(
			{
				...props,
				isGroup: false,
				imageUrl: props.imageUrl ?? null,
			},
			id,
		)
	}
}
