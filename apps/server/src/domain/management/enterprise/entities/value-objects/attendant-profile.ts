import { ValueObject } from '@/core/entities/value-object'
import type { SetOptional } from 'type-fest'

export interface AttendantProfileProps {
	email: string
	name: string
	displayName: string
}

export class AttendantProfile extends ValueObject<AttendantProfileProps> {
	get email() {
		return this.props.email
	}

	get name() {
		return this.props.name
	}

	get displayName() {
		return this.props.displayName
	}

	static create(props: SetOptional<AttendantProfileProps, 'displayName'>) {
		return new AttendantProfile({
			...props,
			displayName: props.displayName ?? props.name,
		})
	}
}
