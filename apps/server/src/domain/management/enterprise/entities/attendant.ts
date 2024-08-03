import type { SetNonNullable, SetOptional } from 'type-fest'

import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AttendantInstanceList } from './attendant-instance-list'
import type { AttendantProfile } from './value-objects/attendant-profile'

export interface AttendantProps {
	profile: AttendantProfile
	password: string | null
	instances: AttendantInstanceList
}

type AttendantHasPassword = SetNonNullable<AttendantProps, 'password'>

export class Attendant extends Entity<AttendantProps> {
	get profile() {
		return this.props.profile
	}

	get password() {
		return this.props.password
	}

	hasPassword(): this is AttendantHasPassword {
		return !!this.password
	}

	get instances() {
		return this.props.instances
	}

	static create(
		props: SetOptional<AttendantProps, 'password' | 'instances'>,
		id?: UniqueEntityID,
	) {
		const attendant = new Attendant(
			{
				...props,
				password: props.password ?? null,
				instances: props.instances ?? AttendantInstanceList.create([]),
			},
			id,
		)

		return attendant
	}
}
