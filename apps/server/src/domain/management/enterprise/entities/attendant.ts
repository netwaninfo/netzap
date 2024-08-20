import type { SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AttendantInstanceList } from './attendant-instance-list'
import type { AttendantProfile } from './value-objects/attendant-profile'

export interface AttendantProps {
	profile: AttendantProfile
	instances: AttendantInstanceList
}

export class Attendant extends Entity<AttendantProps> {
	get profile() {
		return this.props.profile
	}

	get instances() {
		return this.props.instances
	}

	static create(
		props: SetOptional<AttendantProps, 'instances'>,
		id?: UniqueEntityID,
	) {
		const attendant = new Attendant(
			{
				...props,
				instances: props.instances ?? AttendantInstanceList.create([]),
			},
			id,
		)

		return attendant
	}
}
