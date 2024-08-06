import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { WAEntityID } from '../value-objects/wa-entity-id'

export interface GroupProps {
	waId: WAEntityID
	instanceId: UniqueEntityID
	name: string
	imageUrl: string | null
}

export class Group extends Entity<GroupProps> {
	get waId() {
		return this.props.waId
	}

	get instanceId() {
		return this.props.instanceId
	}

	get name() {
		return this.props.name
	}

	get imageUrl() {
		return this.props.imageUrl
	}

	static create(
		props: SetOptional<GroupProps, 'imageUrl'>,
		id?: UniqueEntityID,
	) {
		return new Group(
			{
				...props,
				imageUrl: props.imageUrl ?? null,
			},
			id,
		)
	}
}
