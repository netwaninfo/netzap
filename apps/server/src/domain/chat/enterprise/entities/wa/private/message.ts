import type { SetNonNullable, SetOptional } from 'type-fest'
import type { WAMessageID } from '../../value-objects/wa-message-id'
import { WAMessage, type WAMessageProps } from '../message'

export interface WAPrivateMessageProps extends WAMessageProps {
	quoted: WAPrivateMessage | null
}

export class WAPrivateMessage extends WAMessage<WAPrivateMessageProps> {
	get quoted() {
		return this.props.quoted
	}

	hasQuoted(): this is SetNonNullable<WAPrivateMessageProps, 'quoted'> {
		return !!this.quoted
	}

	static create(
		props: SetOptional<WAPrivateMessageProps, 'media' | 'quoted' | 'contacts'>,
		id: WAMessageID,
	) {
		return new WAPrivateMessage(
			{
				...props,
				quoted: props.quoted ?? null,
				media: props.media ?? null,
				contacts: props.contacts ?? null,
			},
			id,
		)
	}
}
