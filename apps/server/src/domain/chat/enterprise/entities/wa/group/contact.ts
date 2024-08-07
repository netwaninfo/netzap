import type { Except, SetOptional } from 'type-fest'
import type { WAEntityID } from '../../value-objects/wa-entity-id'
import { WAContact, type WAContactProps } from '../contact'

export interface WAGroupContactProps extends WAContactProps {
	isGroup: false
}

export class WAGroupContact extends WAContact<WAGroupContactProps> {
	get isGroup() {
		return this.props.isGroup
	}

	get ref() {
		return `${this.instanceId.toString()}/${this.id.toString()}/${this.props.isGroup}`
	}

	static create(
		props: Except<
			SetOptional<
				WAGroupContactProps,
				'name' | 'shortName' | 'pushName' | 'imageUrl'
			>,
			'isGroup'
		>,
		id: WAEntityID,
	) {
		return new WAGroupContact(
			{
				...props,
				isGroup: false,
				name: props.name ?? null,
				shortName: props.shortName ?? null,
				pushName: props.pushName ?? null,
				imageUrl: props.imageUrl ?? null,
			},
			id,
		)
	}
}
