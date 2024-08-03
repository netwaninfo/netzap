import { ValueObject } from '../value-object'

interface RawValueObjectProps {
	isTrue?: boolean
}

class RawValueObject extends ValueObject<RawValueObjectProps> {
	static create(props: RawValueObjectProps) {
		return new RawValueObject(props)
	}
}

describe('Value Object', () => {
	it('should be able to equals it self', () => {
		const valueObject = RawValueObject.create({
			isTrue: true,
		})

		expect(valueObject.equals(valueObject)).toBe(true)
	})
})
