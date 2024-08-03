import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { GroupInstanceList } from './group-instance-list'
import type { WAEntityID } from './value-objects/wa-entity-id'

export interface GroupProps {
	waId: WAEntityID
	name: string
	imageUrl: string | null
	instances: GroupInstanceList
}

export class Group extends Entity<GroupProps> {
	get waId() {
		return this.props.waId
	}

	get name() {
		return this.props.name
	}

	get imageUrl() {
		return this.props.imageUrl
	}

	get instances() {
		return this.props.instances
	}

	static create(
		props: SetOptional<GroupProps, 'imageUrl' | 'instances'>,
		id?: UniqueEntityID,
	) {
		return new Group(
			{
				...props,
				imageUrl: props.imageUrl ?? null,
				instances: props.instances ?? GroupInstanceList.create([]),
			},
			id,
		)
	}
}
