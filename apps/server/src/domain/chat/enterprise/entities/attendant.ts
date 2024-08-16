import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AttendantProps {
	instanceId: UniqueEntityID
	email: string
	name: string
}

export class Attendant extends Entity<AttendantProps> {
	get instanceId() {
		return this.props.instanceId
	}

	get email() {
		return this.props.email
	}

	get name() {
		return this.props.name
	}

	static create(props: AttendantProps, id?: UniqueEntityID) {
		return new Attendant({ ...props }, id)
	}
}
