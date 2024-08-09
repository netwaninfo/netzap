import { ValueObject } from '@/core/entities/value-object'

export interface ContactPhoneProps {
	number: string
	formattedNumber: string
}

export class ContactPhone extends ValueObject<ContactPhoneProps> {
	get number() {
		return this.props.number
	}

	get formattedNumber() {
		return this.props.formattedNumber
	}

	static create(props: ContactPhoneProps) {
		return new ContactPhone({ ...props })
	}
}
